import { Module, Provider } from '@nestjs/common';
import { DatabaseModule } from 'src/infrastructure/plugins/database/database.module';
import { UsuarioController } from '../../../infrastructure/adapter/controller/usuario.controller';
import { PassportModule } from '@nestjs/passport';
import { UsuarioTypeOrmRepository } from '../../../infrastructure/repository/usuario-typeorm.repository';
import { CriarUsuarioUseCase } from '../../../domain/application/usecases/criar-usuario.usecase';
import { AtualizarUsuarioUseCase } from '../../../domain/application/usecases/atualizar-usuario.usecase';
import { DeletarUsuarioUseCase } from '../../../domain/application/usecases/deletar-usuario.usecase';
import { BuscarPorIdUsuarioUseCase } from '../../../domain/application/usecases/buscar-por-id-usuario.usecase';
import { BuscarUsuariosPaginacaoUseCase } from '../../../domain/application/usecases/buscar-usuarios-paginacao.usecase';
import { EmailJaCadastradoValidator } from '../../../domain/application/validators/email-ja-cadastrado.validator';
import { LoginJaCadastradoValidator } from '../../../domain/application/validators/login-ja-cadastrado.validator';
import { UpdateUsuarioValidator } from '../../../domain/application/validators/update-usuario.validator';
import { AtualizarPerfilUsuarioUseCase } from '../../../domain/application/usecases/atualiza-perfil.usecase';
import { SenhaValidaValidator } from '../../../domain/application/validators/senha-valida.validator';

const providers: Provider[] = [
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
  ],
  controllers: [UsuarioController],
  providers: [...providers],
  exports: [...providers],
})
export class UsuarioModule {}
