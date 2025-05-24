import { Injectable } from '@nestjs/common';
import { UseCase } from '@/src/core/interfaces/usecase.interface';
import { ProjetoSetorPrismaRepository } from '@/src/infrastructure/repository/projeto-setor-prisma.repository';
import { ProjetoSetorPrisma } from '@prisma/client';

@Injectable()
export class BuscarPorSetorProjetoSetorUseCase
  implements UseCase<ProjetoSetorPrisma[]>
{
  constructor(private readonly repository: ProjetoSetorPrismaRepository) {}

  async execute(setorId: string): Promise<ProjetoSetorPrisma[]> {
    return this.repository.buscarPorSetor(setorId);
  }
}
