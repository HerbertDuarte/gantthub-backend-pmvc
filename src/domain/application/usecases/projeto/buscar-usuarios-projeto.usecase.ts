import { Injectable, ForbiddenException } from '@nestjs/common';
import { UseCase } from '@/src/core/interfaces/usecase.interface';
import { UsuarioPrisma } from '@prisma/client';
import { ProjetoPrismaRepository } from '@/src/infrastructure/repository/projeto-prisma.repository';

@Injectable()
export class BuscarUsuariosProjetoUseCase implements UseCase<UsuarioPrisma[]> {
  constructor(private readonly projetoRepository: ProjetoPrismaRepository) {}

  async execute(
    projetoId: string,
    usuarioId?: string,
  ): Promise<UsuarioPrisma[]> {
    if (usuarioId) {
      const temRelacao =
        await this.projetoRepository.isUsuarioRelacionadoAoProjeto(
          projetoId,
          usuarioId,
        );

      if (!temRelacao) {
        throw new ForbiddenException(
          'Você não tem permissão para acessar este projeto',
        );
      }
    }

    return this.projetoRepository.findUsuariosDoProjeto(projetoId);
  }
}
