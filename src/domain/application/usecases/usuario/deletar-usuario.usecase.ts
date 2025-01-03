import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { UseCase } from '@/src/core/interfaces/usecase.interface';
import { Usuario } from '@/src/domain/entity/usuario';

import { UsuarioPrismaRepository } from '../../../../infrastructure/repository/usuario-prisma.repository';

@Injectable()
export class DeletarUsuarioUseCase implements UseCase<Usuario> {
  private readonly logger = new Logger(DeletarUsuarioUseCase.name);
  constructor(private readonly usuarioRepository: UsuarioPrismaRepository) {}

  async execute(id: string): Promise<void> {
    const usuarioExists = await this.usuarioRepository.findById(id);

    if (!usuarioExists) {
      this.logger.error('usuario não existe!');
      throw new NotFoundException('usuario não existe!');
    }

    await this.usuarioRepository.deleta(id);
  }
}
