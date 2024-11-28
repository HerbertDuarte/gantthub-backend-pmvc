import { Logger, Module, Provider } from '@nestjs/common';
import { LoginUseCase } from 'src/domain/application/usecases/login.usecase';
import { AuthUsuarioValidator } from 'src/domain/application/validators/auth-usuario.validator';
import { JwtStrategy } from './adapter/strategy/jwt.strategy';
import { LocalStrategy } from './adapter/strategy/local.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsuarioModule } from 'src/modules/usuarios/infra/usuario.module';
import { AuthController } from './adapter/controller/auth.controller';
import { AtualizarPerfilUsuarioUseCase } from 'src/domain/application/usecases/atualiza-perfil.usecase';
import { AtualizarUsuarioUseCase } from 'src/domain/application/usecases/atualizar-usuario.usecase';
import { BuscarPorIdUsuarioUseCase } from 'src/domain/application/usecases/buscar-por-id-usuario.usecase';
import { BuscarUsuariosPaginacaoUseCase } from 'src/domain/application/usecases/buscar-usuarios-paginacao.usecase';
import { CriarUsuarioUseCase } from 'src/domain/application/usecases/criar-usuario.usecase';
import { DeletarUsuarioUseCase } from 'src/domain/application/usecases/deletar-usuario.usecase';
import { EmailJaCadastradoValidator } from 'src/domain/application/validators/email-ja-cadastrado.validator';
import { LoginJaCadastradoValidator } from 'src/domain/application/validators/login-ja-cadastrado.validator';
import { SenhaValidaValidator } from 'src/domain/application/validators/senha-valida.validator';
import { UpdateUsuarioValidator } from 'src/domain/application/validators/update-usuario.validator';
import { UsuarioTypeOrmRepository } from './repository/usuario-typeorm.repository';
import { DatabaseModule } from './plugins/database/database.module';

const providers: Provider[] = [
  LoginUseCase,
  AuthUsuarioValidator,
  LocalStrategy,
  JwtStrategy,
  Logger,
  UsuarioTypeOrmRepository,
  CriarUsuarioUseCase,
  AtualizarUsuarioUseCase,
  DeletarUsuarioUseCase,
  BuscarPorIdUsuarioUseCase,
  BuscarUsuariosPaginacaoUseCase,
  AtualizarPerfilUsuarioUseCase,
  EmailJaCadastradoValidator,
  LoginJaCadastradoValidator,
  UpdateUsuarioValidator,
  SenhaValidaValidator,
];
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    DatabaseModule,
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
export class InfrastructureModule {}
