import { Logger, Module, Provider } from '@nestjs/common';
import { LoginService } from '@/src/infrastructure/adapter/service/login.service';
import { AuthUsuarioValidator } from '@/src/domain/application/validators/auth-usuario.validator';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AtualizarPerfilUsuarioUseCase } from '@/src/domain/application/usecases/usuario/atualiza-perfil.usecase';
import { CriarUsuarioUseCase } from '@/src/domain/application/usecases/usuario/criar-usuario.usecase';
import { DeletarUsuarioUseCase } from '@/src/domain/application/usecases/usuario/deletar-usuario.usecase';
import { EmailJaCadastradoValidator } from '@/src/domain/application/validators/email-ja-cadastrado.validator';
import { LoginJaCadastradoValidator } from '@/src/domain/application/validators/login-ja-cadastrado.validator';
import { SenhaValidaValidator } from '@/src/domain/application/validators/senha-valida.validator';
import { UpdateUsuarioValidator } from '@/src/domain/application/validators/update-usuario.validator';
import { AtualizarUsuarioUseCase } from '@/src/domain/application/usecases/usuario/atualizar-usuario.usecase';
import { BuscarPorIdUsuarioUseCase } from '@/src/domain/application/usecases/usuario/buscar-por-id-usuario.usecase';
import { BuscarUsuariosPaginacaoUseCase } from '@/src/domain/application/usecases/usuario/buscar-usuarios-paginacao.usecase';
import { DatabaseModule } from './plugins/database/database.module';
import { UsuarioPrismaRepository } from './repository/usuario-prisma.repository';
import { AuthController } from './adapter/controller/auth.controller';
import { LocalStrategy } from './adapter/strategy/local.strategy';
import { JwtStrategy } from './adapter/strategy/jwt.strategy';
import { UsuarioController } from './adapter/controller/usuario.controller';
import { ProjetoModule } from './module/projeto.module';
import { MarcoModule } from './module/marco.module';
import { TarefaModule } from './module/tarefa.module';
import { SubTarefaModule } from './module/subtarefa.module';
import { UsuarioProjetoModule } from './module/usuario-projeto.module';
import { ProjetoSetorModule } from './module/projeto-setor.module';
import { UsuarioSetorModule } from './module/usuario-setor.module';
import { SetorModule } from './module/setor.module';

const usecases: Provider[] = [
  LoginService,
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
    ProjetoModule,
    MarcoModule,
    TarefaModule,
    SubTarefaModule,
    UsuarioProjetoModule,
    ProjetoSetorModule,
    UsuarioSetorModule,
    SetorModule,
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
