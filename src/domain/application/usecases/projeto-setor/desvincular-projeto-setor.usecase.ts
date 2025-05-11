import { Injectable } from '@nestjs/common';
import { UseCase } from '@/src/core/interfaces/usecase.interface';
import { SetorPrismaRepository } from '@/src/infrastructure/repository/setor-prisma.repository';
import { PrismaService } from '@/src/infrastructure/plugins/database/services/prisma.service';

@Injectable()
export class DesvincularProjetoSetorUseCase implements UseCase<void> {
  constructor(
    private readonly setorRepository: SetorPrismaRepository,
    private readonly prismaService: PrismaService,
  ) {}

  async execute({
    projetoId,
    setorId,
  }: {
    projetoId: string;
    setorId: string;
  }): Promise<void> {
    const vinculoExistente =
      await this.prismaService.projetoSetorPrisma.findUnique({
        where: {
          projetoId_setorId: {
            projetoId,
            setorId,
          },
        },
      });

    if (vinculoExistente) {
      await this.setorRepository.removerProjeto(setorId, projetoId);
    }
  }
}
