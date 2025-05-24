import { Injectable } from '@nestjs/common';
import { UseCase } from '@/src/core/interfaces/usecase.interface';
import { ProjetoSetorPrismaRepository } from '@/src/infrastructure/repository/projeto-setor-prisma.repository';
import { RemoveProjetoSetorDto } from '../../dto/projeto-setor/remove-projeto-setor.dto';

@Injectable()
export class DesvincularProjetoSetorUseCase implements UseCase<void> {
  constructor(private readonly repository: ProjetoSetorPrismaRepository) {}

  async execute(dados: RemoveProjetoSetorDto): Promise<void> {
    return this.repository.desvincular({
      projetoId: dados.projetoId,
      setorId: dados.setorId,
    });
  }
}
