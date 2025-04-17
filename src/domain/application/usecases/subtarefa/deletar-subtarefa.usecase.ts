import { Injectable } from '@nestjs/common';
import { UseCase } from '@/src/core/interfaces/usecase.interface';
import { SubTarefaPrismaRepository } from '@/src/infrastructure/repository/subtarefa-prisma.repository';

@Injectable()
export class DeletarSubTarefaUseCase implements UseCase<void> {
  constructor(private readonly repository: SubTarefaPrismaRepository) {}

  async execute(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
