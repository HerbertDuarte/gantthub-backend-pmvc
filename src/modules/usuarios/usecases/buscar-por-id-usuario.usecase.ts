import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { UsuarioRepository } from '../repository/usuario.repository';
import { Usuario } from '@prisma/client';
import { UseCase } from 'src/core/interfaces/usecase.interface';

@Injectable()
export class BuscarPorIdUsuarioUseCase implements UseCase<Usuario> {
  private readonly logger = new Logger(BuscarPorIdUsuarioUseCase.name);

  constructor(private readonly usuarioRepository: UsuarioRepository) {}

  async execute(id: string): Promise<Usuario> {
    const usuario = await this.usuarioRepository.buscaPorId(id);

    if (!usuario) {
      this.logger.error('Usuário não encontrado!');
      throw new NotFoundException('Usuário não encontrado!');
    }

    return usuario;
  }
}
