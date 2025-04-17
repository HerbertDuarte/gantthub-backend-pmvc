import { Injectable } from '@nestjs/common';
import { UseCase } from '@/src/core/interfaces/usecase.interface';
import { SubTarefaPrisma } from '@prisma/client';
import { CriaSubTarefaDto } from '../../dto/subtarefa/cria-subtarefa.dto';
import { SubtarefaValidatorService } from '@/src/infrastructure/adapter/service/subtarefa-validator.service';
import { SubTarefaPrismaRepository } from '@/src/infrastructure/repository/subtarefa-prisma.repository';
import { SubTarefaPrismaBuilder } from '@/src/infrastructure/builder/subtarefa-prisma.builder';

@Injectable()
export class CriarSubTarefaUseCase implements UseCase<SubTarefaPrisma> {
  constructor(
    private readonly repository: SubTarefaPrismaRepository,
    private readonly validator: SubtarefaValidatorService,
  ) {}

  async execute(data: CriaSubTarefaDto): Promise<SubTarefaPrisma> {
    await this.validator.validarPrazos(
      data.tarefaPaiId,
      data.dataInicio,
      data.dataFim,
    );

    const subtarefa = SubTarefaPrismaBuilder.build(data);
    return this.repository.create(subtarefa);
  }
}
