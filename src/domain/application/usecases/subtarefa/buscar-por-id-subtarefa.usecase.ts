import { Injectable } from '@nestjs/common';
import { UseCase } from '@/src/core/interfaces/usecase.interface';
import { SubTarefaPrisma } from '@prisma/client';
import { SubTarefaPrismaRepository } from '@/src/infrastructure/repository/subtarefa-prisma.repository';

@Injectable()
export class BuscarPorIdSubTarefaUseCase implements UseCase<SubTarefaPrisma> {
  constructor(private readonly repository: SubTarefaPrismaRepository) {}

  async execute(id: string): Promise<SubTarefaPrisma> {
    return this.repository.findById(id);
  }
}
