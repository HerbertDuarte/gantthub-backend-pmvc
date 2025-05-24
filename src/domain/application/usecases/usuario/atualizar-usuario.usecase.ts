import { Injectable, ConflictException } from '@nestjs/common';
import { HashUtils } from 'lib-test-herbert';
import { UseCase } from '@/src/core/interfaces/usecase.interface';
import { UsuarioPrismaRepository } from '@/src/infrastructure/repository/usuario-prisma.repository';

import { AtualizaUsuarioDto } from '../../dto/usuario/atualiza-usuario.dto';
import { CriaUsuarioDto } from '../../dto/usuario/cria-usuario.dto';
import { SenhaValidaValidator } from '../../validators/senha-valida.validator';
import { UpdateUsuarioValidator } from '../../validators/update-usuario.validator';
import { UsuarioPrisma } from '@prisma/client';
import { UsuarioPrismaBuilder } from '@/src/infrastructure/builder/usuario-prisma.builder';

@Injectable()
export class AtualizarUsuarioUseCase implements UseCase<UsuarioPrisma> {
  constructor(
    private readonly usuarioRepository: UsuarioPrismaRepository,
    private readonly updateUsuarioValidator: UpdateUsuarioValidator,
    private readonly senhaValidaValidator: SenhaValidaValidator,
  ) {}

  async execute(id: string, data: AtualizaUsuarioDto): Promise<void> {
    const usuarioExists = await this.usuarioRepository.findById(id);
    if (!usuarioExists) throw new ConflictException('Usuário não encontrado.');

    const atualizaUsuarioPayload: Partial<CriaUsuarioDto> = {
      ...data,
      senha: undefined,
    };

    const atualizaSenha = !!data.senhaNova;

    if (atualizaSenha) {
      await this.senhaValidaValidator.validate(usuarioExists, data);
      atualizaUsuarioPayload.senha = await HashUtils.hashString(data.senhaNova);
    }

    await this.updateUsuarioValidator.validate(
      usuarioExists,
      atualizaUsuarioPayload,
    );

    const { email, login, nome, senha, role } = atualizaUsuarioPayload;
    const allowedUpdateFields = { email, login, nome, senha, role };

    const usuario = UsuarioPrismaBuilder.build({
      id: usuarioExists.id,
      email: usuarioExists.email,
      nome: usuarioExists.nome,
      login: usuarioExists.login,
      createdAt: usuarioExists.createdAt,
      senha: usuarioExists.senha,
      situacao: usuarioExists.situacao,
      ...allowedUpdateFields,
    });
    await this.usuarioRepository.atualiza(id, usuario);
  }
}
