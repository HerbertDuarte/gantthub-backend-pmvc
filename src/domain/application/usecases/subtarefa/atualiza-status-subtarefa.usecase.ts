import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { SubTarefaPrisma } from '@prisma/client';
import { TarefaStatusEnum } from '@/src/domain/enum/tarefa-status.enum';
import { isBefore, startOfDay } from 'date-fns';
import { PrismaService } from '@/src/infrastructure/plugins/database/services/prisma.service';

@Injectable()
export class AtualizaStatusSubTarefaUsecase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(
    { status, justificativa }: Partial<SubTarefaPrisma>,
    subTarefaId: string,
  ) {
    const tarefaExists = await this.prisma.subTarefaPrisma.findUnique({
      where: {
        id: subTarefaId,
      },
    });

    if (!tarefaExists) {
      throw new NotFoundException('Tarefa não encontrado');
    }

    if (status === TarefaStatusEnum.PENDENTE) {
      if (!justificativa) {
        throw new BadRequestException(
          'Para definir uma tarefa como pendente é preciso passar uma justificativa',
        );
      } else if (justificativa.length < 5) {
        throw new BadRequestException(
          'A justificativa precisa ter no mínimo 5 caracteres',
        );
      }
    } else {
      justificativa = '';
    }

    if (status === TarefaStatusEnum.CONCLUIDA) {
      const isPastDue = isBefore(
        startOfDay(tarefaExists.dataFim),
        startOfDay(new Date()),
      );
      if (isPastDue) {
        status = TarefaStatusEnum.CONCLUIDA_COM_ATRASO;
      }
    }

    return this.prisma.subTarefaPrisma.update({
      where: {
        id: subTarefaId,
      },
      data: {
        status,
        justificativa,
      },
    });
  }
}
