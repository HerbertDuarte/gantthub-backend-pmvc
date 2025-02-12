import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { UseCase } from '@/src/core/interfaces/usecase.interface';

import { UsuarioPrismaRepository } from '../../../../infrastructure/repository/usuario-prisma.repository';
import { UsuarioPrisma } from '@prisma/client';

@Injectable()
export class DeletarUsuarioUseCase implements UseCase<UsuarioPrisma> {
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
