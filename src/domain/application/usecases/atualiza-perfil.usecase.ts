import { ConflictException, Injectable } from '@nestjs/common';
import { UsuarioTypeOrmRepository } from '../../../infrastructure/repository/usuario-typeorm.repository';
import { Usuario } from '@prisma/client';
import { UseCase } from 'src/core/interfaces/usecase.interface';
import { UpdateUsuarioValidator } from '../validators/update-usuario.validator';
import { AtualizaPerfilUsuarioDto } from '../dto/usuario/atualiza-perfil.dto';
import { SenhaValidaValidator } from '../validators/senha-valida.validator';
import { CriaUsuarioDto } from '../dto/usuario/cria-usuario.dto';
import { HashUtils } from 'lib-test-herbert';
import { UsuarioEntity } from '../../entity/usuario.entity';

@Injectable()
export class AtualizarPerfilUsuarioUseCase implements UseCase<Usuario> {
  constructor(
    private readonly usuarioRepository: UsuarioTypeOrmRepository,
    private readonly updateUsuarioValidator: UpdateUsuarioValidator,
    private readonly senhaValidaValidator: SenhaValidaValidator,
  ) {}

  async execute(id: string, data: AtualizaPerfilUsuarioDto): Promise<void> {
    const usuarioExists = await this.usuarioRepository.buscaPorId(id);
    if (!usuarioExists) throw new ConflictException('Usuário não encontrado.');

    const atualizaUsuarioPayload: Partial<CriaUsuarioDto> = data;

    const atualizaSenha = data.senhaNova;

    if (atualizaSenha) {
      await this.senhaValidaValidator.validate(usuarioExists, data);
      atualizaUsuarioPayload.senha = await HashUtils.hashString(data.senhaNova);
    }

    await this.updateUsuarioValidator.validate(
      usuarioExists,
      atualizaUsuarioPayload,
    );

    const usuario = new UsuarioEntity({
      id: usuarioExists.getId(),
      email: usuarioExists.getEmail(),
      nome: usuarioExists.getNome(),
      login: usuarioExists.getLogin(),
      createdAt: usuarioExists.getCreatedAt(),
      deletedAt: usuarioExists.getDeletedAt(),
      updatedAt: new Date(),
      senha: usuarioExists.getSenha(),
      situacao: usuarioExists.getSituacao(),
      ...atualizaUsuarioPayload,
    });

    await this.usuarioRepository.atualiza(id, usuario);
  }
}
