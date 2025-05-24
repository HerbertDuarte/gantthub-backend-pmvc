import { Injectable, ForbiddenException } from '@nestjs/common';
import { UseCase } from '@/src/core/interfaces/usecase.interface';
import { ProjetoPrisma } from '@prisma/client';
import { ProjetoPrismaRepository } from '@/src/infrastructure/repository/projeto-prisma.repository';

@Injectable()
export class BuscarPorIdProjetoUseCase implements UseCase<ProjetoPrisma> {
  constructor(private readonly projetoRepository: ProjetoPrismaRepository) {}

  async execute(id: string, usuarioId?: string): Promise<ProjetoPrisma> {
    if (usuarioId) {
      const temRelacao =
        await this.projetoRepository.isUsuarioRelacionadoAoProjeto(
          id,
          usuarioId,
        );

      if (!temRelacao) {
        throw new ForbiddenException(
          'Você não tem permissão para acessar este projeto',
        );
      }
    }

    return this.projetoRepository.findById(id);
  }
}
