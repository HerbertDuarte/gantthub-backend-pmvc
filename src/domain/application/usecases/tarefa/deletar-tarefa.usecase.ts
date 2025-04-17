import { Injectable } from '@nestjs/common';
import { UseCase } from '@/src/core/interfaces/usecase.interface';
import { TarefaPrismaRepository } from '@/src/infrastructure/repository/tarefa-prisma.repository';

@Injectable()
export class DeletarTarefaUseCase implements UseCase<void> {
  constructor(private readonly repository: TarefaPrismaRepository) {}

  async execute(id: string): Promise<void> {
    return this.repository.delete(id);
  }
}
