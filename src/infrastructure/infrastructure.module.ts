import { Logger, Module, Provider } from '@nestjs/common';
import { LoginUseCase } from 'src/domain/application/usecases/auth/login.usecase';
import { AuthUsuarioValidator } from 'src/domain/application/validators/auth-usuario.validator';
import { JwtStrategy } from './adapter/strategy/jwt.strategy';
import { LocalStrategy } from './adapter/strategy/local.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './adapter/controller/auth.controller';
import { AtualizarPerfilUsuarioUseCase } from 'src/domain/application/usecases/usuario/atualiza-perfil.usecase';
import { CriarUsuarioUseCase } from 'src/domain/application/usecases/usuario/criar-usuario.usecase';
import { DeletarUsuarioUseCase } from 'src/domain/application/usecases/usuario/deletar-usuario.usecase';
import { EmailJaCadastradoValidator } from 'src/domain/application/validators/email-ja-cadastrado.validator';
import { LoginJaCadastradoValidator } from 'src/domain/application/validators/login-ja-cadastrado.validator';
import { SenhaValidaValidator } from 'src/domain/application/validators/senha-valida.validator';
import { UpdateUsuarioValidator } from 'src/domain/application/validators/update-usuario.validator';
import { UsuarioPrismaRepository } from './repository/usuario-prisma.repository';
import { DatabaseModule } from './plugins/database/database.module';
import { AtualizarUsuarioUseCase } from 'src/domain/application/usecases/usuario/atualizar-usuario.usecase';
import { BuscarPorIdUsuarioUseCase } from 'src/domain/application/usecases/usuario/buscar-por-id-usuario.usecase';
import { BuscarUsuariosPaginacaoUseCase } from 'src/domain/application/usecases/usuario/buscar-usuarios-paginacao.usecase';
import { UsuarioController } from './adapter/controller/usuario.controller';

const usecases: Provider[] = [
  LoginUseCase,
  CriarUsuarioUseCase,
  AtualizarUsuarioUseCase,
  DeletarUsuarioUseCase,
  BuscarPorIdUsuarioUseCase,
  BuscarUsuariosPaginacaoUseCase,
  AtualizarPerfilUsuarioUseCase,
];

const repositories: Provider[] = [UsuarioPrismaRepository];
const validators: Provider[] = [
  EmailJaCadastradoValidator,
  LoginJaCadastradoValidator,
  SenhaValidaValidator,
  UpdateUsuarioValidator,
  AuthUsuarioValidator,
];

const strategies: Provider[] = [LocalStrategy, JwtStrategy];
const utils: Provider[] = [Logger];
const providers: Provider[] = [
  ...usecases,
  ...repositories,
  ...validators,
  ...strategies,
  ...utils,
];

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    DatabaseModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRE') },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController, UsuarioController],
  providers,
  exports: providers,
})
export class InfrastructureModule {}
