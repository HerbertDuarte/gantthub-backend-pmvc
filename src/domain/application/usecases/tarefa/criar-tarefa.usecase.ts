import { Injectable } from '@nestjs/common';
import { UseCase } from '@/src/core/interfaces/usecase.interface';
import { TarefaPrisma } from '@prisma/client';
import { CriaTarefaDto } from '../../dto/tarefa/cria-tarefa.dto';
import { TarefaPrismaRepository } from '@/src/infrastructure/repository/tarefa-prisma.repository';
import { TarefaPrismaBuilder } from '@/src/infrastructure/builder/tarefa-prisma.builder';

@Injectable()
export class CriarTarefaUseCase implements UseCase<TarefaPrisma> {
  constructor(private readonly repository: TarefaPrismaRepository) {}

  async execute(data: CriaTarefaDto): Promise<TarefaPrisma> {
    const tarefa = TarefaPrismaBuilder.build(data);
    return this.repository.create(tarefa);
  }
}
