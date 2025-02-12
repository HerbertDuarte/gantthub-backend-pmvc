import { ConflictException, Injectable } from '@nestjs/common';
import { UseCase } from '@/src/core/interfaces/usecase.interface';
import { HashUtils } from 'lib-test-herbert';

import { UsuarioPrismaRepository } from '../../../../infrastructure/repository/usuario-prisma.repository';
import { UpdateUsuarioValidator } from '../../validators/update-usuario.validator';
import { AtualizaPerfilUsuarioDto } from '../../dto/usuario/atualiza-perfil.dto';
import { SenhaValidaValidator } from '../../validators/senha-valida.validator';
import { CriaUsuarioDto } from '../../dto/usuario/cria-usuario.dto';
import { UsuarioPrisma } from '@prisma/client';
import { UsuarioPrismaBuilder } from '@/src/infrastructure/builder/usuario-prisma.builder';

@Injectable()
export class AtualizarPerfilUsuarioUseCase implements UseCase<UsuarioPrisma> {
  constructor(
    private readonly usuarioRepository: UsuarioPrismaRepository,
    private readonly updateUsuarioValidator: UpdateUsuarioValidator,
    private readonly senhaValidaValidator: SenhaValidaValidator,
  ) {}

  async execute(id: string, data: AtualizaPerfilUsuarioDto): Promise<void> {
    const usuarioExists = await this.usuarioRepository.findById(id);
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

    const usuario = UsuarioPrismaBuilder.build({
      id: usuarioExists.id,
      email: usuarioExists.email,
      nome: usuarioExists.nome,
      login: usuarioExists.login,
      createdAt: usuarioExists.createdAt,
      senha: usuarioExists.senha,
      situacao: usuarioExists.situacao,
      ...atualizaUsuarioPayload,
    });

    await this.usuarioRepository.atualiza(id, usuario);
  }
}
