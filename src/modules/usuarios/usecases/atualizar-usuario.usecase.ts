import { Injectable } from '@nestjs/common';
import { UsuarioRepository } from '../repository/usuario.repository';
import { Usuario } from '@prisma/client';
import { UseCase } from 'src/core/interfaces/usecase.interface';
import { AtualizaUsuarioDto } from '../dto/atualiza-usuario.dto';
import { UpdateUsuarioValidator } from '../validators/update-usuario.validator';
import { SenhaValidaValidator } from '../validators/senha-valida.validator';
import { CriaUsuarioDto } from '../dto/cria-usuario.dto';
import { HashUtils } from 'lib-test-herbert';

@Injectable()
export class AtualizarUsuarioUseCase implements UseCase<Usuario> {
  constructor(
    private readonly usuarioRepository: UsuarioRepository,
    private readonly updateUsuarioValidator: UpdateUsuarioValidator,
    private readonly senhaValidaValidator: SenhaValidaValidator,
  ) {}

  async execute(id: string, data: AtualizaUsuarioDto): Promise<void> {
    const usuarioExists = await this.usuarioRepository.buscaPorId(id);
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

    await this.usuarioRepository.atualiza(id, atualizaUsuarioPayload);
  }
}
