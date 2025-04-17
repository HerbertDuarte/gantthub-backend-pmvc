import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../plugins/database/services/prisma.service';
import { DataValidationException } from '../exception/data-validation.exception';

@Injectable()
export class SubtarefaValidatorService {
  constructor(private readonly prisma: PrismaService) {}

  async validarPrazos(
    tarefaPaiId: string,
    dataInicio: Date | string,
    dataFim: Date | string,
  ) {
    const tarefaPai = await this.prisma.tarefaPrisma.findUnique({
      where: {
        id: tarefaPaiId,
      },
    });

    if (!tarefaPai) {
      throw new NotFoundException('Tarefa pai não encontrada');
    }

    const subTarefaInicio = new Date(dataInicio);
    const subTarefaFim = new Date(dataFim);
    const tarefaPaiInicio = new Date(tarefaPai.dataInicio);
    const tarefaPaiFim = new Date(tarefaPai.dataFim);

    // Validar se as datas da subtarefa estão dentro do período da tarefa pai
    if (subTarefaInicio < tarefaPaiInicio || subTarefaFim > tarefaPaiFim) {
      throw new DataValidationException(
        'O período da subtarefa deve estar dentro do período da tarefa pai',
      );
    }

    // Validar se a data de início é anterior à data de fim
    if (subTarefaInicio > subTarefaFim) {
      throw new DataValidationException(
        'A data de início deve ser anterior ou igual à data de fim',
      );
    }
  }
}
