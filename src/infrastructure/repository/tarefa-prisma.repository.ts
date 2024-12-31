import { Injectable } from '@nestjs/common';
import { PrismaService } from '../plugins/database/services/prisma.service';
import { CreateTarefaDto } from '../adapter/controller/tarefa.controller';
import { TarefaStatusEnum } from 'src/domain/enum/tarefa-status.enum';

@Injectable()
export class TarefaPrismaRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public async getAll() {
    return this.prismaService.tarefaPrisma.findMany();
  }

  public async create(dto: CreateTarefaDto) {
    return this.prismaService.tarefaPrisma.create({
      data: {
        nome: dto.nome,
        descricao: dto.descricao ?? '',
        dataInicio: dto.dataInicio,
        dataFim: dto.dataFim,
        status: TarefaStatusEnum.NAO_INICIADA,
        marco: {
          connect: {
            id: dto.marcoId,
          },
        },
      },
    });
  }

  public async update(id: string, dto: Partial<CreateTarefaDto>) {
    const data = {};
    dto.nome && (data['nome'] = dto.nome);
    dto.descricao && (data['descricao'] = dto.descricao);

    return this.prismaService.tarefaPrisma.update({
      where: {
        id,
      },
      data,
    });
  }
}
