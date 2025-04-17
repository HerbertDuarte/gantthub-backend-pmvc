import { BadRequestException, Injectable } from '@nestjs/common';
import { UseCase } from '@/src/core/interfaces/usecase.interface';
import { SubTarefaPrisma } from '@prisma/client';
import { SubTarefaPrismaRepository } from '@/src/infrastructure/repository/subtarefa-prisma.repository';
import { AtualizaSubTarefaDto } from '../../dto/subtarefa/atualiza-subtarefa.dto';
import { SubtarefaValidatorService } from '@/src/infrastructure/adapter/service/subtarefa-validator.service';

@Injectable()
export class AtualizarSubTarefaUseCase implements UseCase<SubTarefaPrisma> {
  constructor(
    private readonly repository: SubTarefaPrismaRepository,
    private readonly validator: SubtarefaValidatorService,
  ) {}

  async execute(
    id: string,
    data: AtualizaSubTarefaDto,
  ): Promise<SubTarefaPrisma> {
    const subtarefa = await this.repository.findById(id);

    if (!subtarefa) {
      throw new BadRequestException('Sub tarefa não encontrada');
    }

    if ((data.dataInicio || data.dataFim) && data.tarefaPaiId) {
      await this.validator.validarPrazos(
        data.tarefaPaiId,
        data.dataInicio,
        data.dataFim,
      );
    }

    return this.repository.update(id, data);
  }
}
