import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { UseCase } from '@/src/core/interfaces/usecase.interface';
import { UsuarioPrismaRepository } from '@/src/infrastructure/repository/usuario-prisma.repository';
import { UsuarioPrisma } from '@prisma/client';

@Injectable()
export class BuscarPorIdUsuarioUseCase implements UseCase<UsuarioPrisma> {
  private readonly logger = new Logger(BuscarPorIdUsuarioUseCase.name);

  constructor(private readonly usuarioRepository: UsuarioPrismaRepository) {}

  async execute(id: string): Promise<UsuarioPrisma> {
    const usuario = await this.usuarioRepository.findById(id);

    if (!usuario) {
      this.logger.error('Usuário não encontrado!');
      throw new NotFoundException('Usuário não encontrado!');
    }

    return usuario;
  }
}
