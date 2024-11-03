import { Module, Provider } from '@nestjs/common';
import { DatabaseModule } from 'src/plugins/database/database.module';
import { UsuarioController } from './usuario.controller';
import { PassportModule } from '@nestjs/passport';
import { UsuarioRepository } from '../repository/usuario.repository';
import { CriarUsuarioUseCase } from '../usecases/criar-usuario.usecase';
import { AtualizarUsuarioUseCase } from '../usecases/atualizar-usuario.usecase';
import { DeletarUsuarioUseCase } from '../usecases/deletar-usuario.usecase';
import { BuscarPorIdUsuarioUseCase } from '../usecases/buscar-por-id-usuario.usecase';
import { BuscarUsuariosPaginacaoUseCase } from '../usecases/buscar-usuarios-paginacao.usecase';
import { EmailJaCadastradoValidator } from '../validators/email-ja-cadastrado.validator';
import { LoginJaCadastradoValidator } from '../validators/login-ja-cadastrado.validator';
import { UpdateUsuarioValidator } from '../validators/update-usuario.validator';
import { AtualizarPerfilUsuarioUseCase } from '../usecases/atualiza-perfil.usecase';
import { SenhaValidaValidator } from '../validators/senha-valida.validator';

const providers: Provider[] = [
  UsuarioRepository,
  CriarUsuarioUseCase,
  AtualizarUsuarioUseCase,
  DeletarUsuarioUseCase,
  BuscarPorIdUsuarioUseCase,
  BuscarUsuariosPaginacaoUseCase,
  AtualizarPerfilUsuarioUseCase,
  EmailJaCadastradoValidator,
  LoginJaCadastradoValidator,
  UpdateUsuarioValidator,
  SenhaValidaValidator
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
