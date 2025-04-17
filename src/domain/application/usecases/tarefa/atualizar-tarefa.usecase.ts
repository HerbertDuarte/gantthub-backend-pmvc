import { Injectable } from '@nestjs/common';
import { UseCase } from '@/src/core/interfaces/usecase.interface';
import { TarefaPrisma } from '@prisma/client';
import { TarefaPrismaRepository } from '@/src/infrastructure/repository/tarefa-prisma.repository';
import { AtualizaTarefaDto } from '../../dto/tarefa/atualiza-tarefa.dto';

@Injectable()
export class AtualizarTarefaUseCase implements UseCase<TarefaPrisma> {
  constructor(private readonly repository: TarefaPrismaRepository) {}

  async execute(id: string, data: AtualizaTarefaDto): Promise<TarefaPrisma> {
    return this.repository.update(id, data);
  }
}
