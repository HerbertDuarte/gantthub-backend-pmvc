import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { PrismaService } from '../../plugins/database/services/prisma.service';
import { TarefaPrisma } from '@prisma/client';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';

import { AtualizaStatusTarefaUsecase } from '@/src/domain/application/usecases/tarefa/atualiza-status-tarefa.usecase';

@Controller('tarefa')
export class TarefaController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly atualizaStatusTarefaUsecase: AtualizaStatusTarefaUsecase,
  ) {}

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getOne(@Param('id') tarefaId: string) {
    const tarefa = await this.prisma.tarefaPrisma.findUnique({
      where: {
        id: tarefaId,
      },
    });

    if (!tarefa) {
      throw new NotFoundException('tarefa não encontrado');
    }

    return tarefa;
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body()
    {
      nome,
      dataFim,
      dataInicio,
      descricao,
      status,
      usuarioId,
      marcoId,
    }: TarefaPrisma,
  ) {
    return this.prisma.tarefaPrisma.create({
      data: {
        nome,
        dataFim,
        dataInicio,
        descricao,
        status,
        usuarioId,
        marcoId,
      },
    });
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async udpate(
    @Body() body: Partial<TarefaPrisma>,
    @Param('id') tarefaId: string,
  ) {
    const { dataFim, dataInicio, descricao, nome, status, justificativa } =
      body;
    const values = { dataFim, dataInicio, descricao, nome };

    await this.atualizaStatusTarefaUsecase.execute(
      { status, justificativa },
      tarefaId,
    );

    const tarefaExists = await this.prisma.tarefaPrisma.findUnique({
      where: {
        id: tarefaId,
      },
    });

    if (!tarefaExists) {
      throw new NotFoundException('Tarefa não encontrado');
    }

    return this.prisma.tarefaPrisma.update({
      where: {
        id: tarefaId,
      },
      data: {
        ...values,
      },
    });
  }

  @Patch(':id/status')
  @UseGuards(JwtAuthGuard)
  async udpateStatus(
    @Body() { status, justificativa }: Partial<TarefaPrisma>,
    @Param('id') tarefaId: string,
  ) {
    return this.atualizaStatusTarefaUsecase.execute(
      { status, justificativa },
      tarefaId,
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') tarefaId: string) {
    const tarefaExists = await this.prisma.tarefaPrisma.findUnique({
      where: {
        id: tarefaId,
      },
    });

    if (!tarefaExists) {
      throw new NotFoundException('Tarefa não encontrado');
    }

    return this.prisma.tarefaPrisma.delete({
      where: {
        id: tarefaId,
      },
    });
  }
}
