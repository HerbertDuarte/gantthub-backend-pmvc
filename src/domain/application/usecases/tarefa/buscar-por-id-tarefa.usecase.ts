import { Injectable } from '@nestjs/common';
import { UseCase } from '@/src/core/interfaces/usecase.interface';
import { TarefaPrisma } from '@prisma/client';
import { TarefaPrismaRepository } from '@/src/infrastructure/repository/tarefa-prisma.repository';

@Injectable()
export class BuscarPorIdTarefaUseCase implements UseCase<TarefaPrisma> {
  constructor(private readonly repository: TarefaPrismaRepository) {}

  async execute(id: string): Promise<TarefaPrisma> {
    return this.repository.findById(id);
  }
}
