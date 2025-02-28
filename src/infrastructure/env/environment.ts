import { plainToClass } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsString,
  validateSync,
} from 'class-validator';

import { InvalidEnvironmentException } from './exception/invalid-env.exception';

type NodeEnv = 'production' | 'development' | 'test';

export class Environment {
  @IsNotEmpty()
  @IsString()
  APP_NAME: string;

  @IsNotEmpty()
  @IsString()
  APP_HOSTNAME: string;

  @IsNotEmpty()
  @IsString()
  APP_VERSION: string;

  @IsNotEmpty()
  @IsNumberString()
  HTTP_PORT: number;

  @IsNotEmpty()
  @IsEnum(['production', 'development', 'test'])
  NODE_ENV: NodeEnv;

  @IsNotEmpty()
  @IsString()
  JWT_SECRET: string;

  @IsNotEmpty()
  @IsString()
  JWT_EXPIRE: string;

  @IsNotEmpty()
  @IsString()
  DATABASE_URL: string;
}

export function validateEnv(config: Record<string, any>) {
  const envConfig = plainToClass(Environment, config);
  const errors = validateSync(envConfig, { skipMissingProperties: false });

  if (errors.length > 0) {
    throw new InvalidEnvironmentException(errors.toString());
  }

  return envConfig;
}
