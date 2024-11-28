import { Logger, Module, Provider } from '@nestjs/common';
import { AuthController } from '../../../infrastructure/adapter/controller/auth.controller';
import { UsuarioModule } from '../../usuarios/infra/usuario.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '../../../infrastructure/adapter/strategy/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from '../../../infrastructure/adapter/strategy/jwt.strategy';
import { LoginUseCase } from '../../../domain/application/usecases/login.usecase';
import { AuthUsuarioValidator } from '../../../domain/application/validators/auth-usuario.validator';

const providers: Provider[] = [
  LoginUseCase,
  AuthUsuarioValidator,
  LocalStrategy,
  JwtStrategy,
  Logger,
];

@Module({
  imports: [
    PassportModule,
    UsuarioModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRE') },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [...providers],
  exports: [...providers],
})
export class AuthModule {}
