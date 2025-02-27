import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { PrismaService } from '../../plugins/database/services/prisma.service';
import { TarefaPrisma } from '@prisma/client';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';

@Controller('tarefa')
export class TarefaController {
  constructor(private readonly prisma: PrismaService) {}

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

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async udpate(@Body() { nome }: TarefaPrisma, @Param('id') tarefaId: string) {
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
        nome,
      },
    });
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
