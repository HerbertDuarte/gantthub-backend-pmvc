import { Injectable } from '@nestjs/common';
import { UseCase } from '@/src/core/interfaces/usecase.interface';
import { ProjetoSetorPrismaRepository } from '@/src/infrastructure/repository/projeto-setor-prisma.repository';
import { CriaProjetoSetorDto } from '../../dto/projeto-setor/cria-projeto-setor.dto';
import { ProjetoSetorPrisma } from '@prisma/client';

@Injectable()
export class VincularProjetoSetorUseCase
  implements UseCase<ProjetoSetorPrisma>
{
  constructor(private readonly repository: ProjetoSetorPrismaRepository) {}

  async execute(dados: CriaProjetoSetorDto): Promise<ProjetoSetorPrisma> {
    return this.repository.vincular({
      projetoId: dados.projetoId,
      setorId: dados.setorId,
    });
  }
}
