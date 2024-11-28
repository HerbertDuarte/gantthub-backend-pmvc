import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validateEnv } from 'env/environment.dto';
import { InfrastructureModule } from './infrastructure/infrastructure.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validate: validateEnv,
    }),
    InfrastructureModule,
  ],
})
export class AppModule {}
