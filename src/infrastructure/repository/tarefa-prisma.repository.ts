import { PrismaService } from '@/src/infrastructure/plugins/database/services/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { TarefaPrisma } from '@prisma/client';

@Injectable()
export class TarefaPrismaRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(tarefa: TarefaPrisma): Promise<TarefaPrisma> {
    const { usuarioId, marcoId, ...tarefaData } = tarefa;
    return this.prismaService.tarefaPrisma.create({
      data: {
        ...tarefaData,
        usuario: {
          connect: {
            id: usuarioId,
          },
        },
        marco: {
          connect: {
            id: marcoId,
          },
        },
      },
    });
  }

  async findById(id: string): Promise<TarefaPrisma> {
    const tarefa = await this.prismaService.tarefaPrisma.findUnique({
      where: { id },
    });

    if (!tarefa) {
      throw new NotFoundException('Tarefa não encontrada');
    }

    return tarefa;
  }

  async update(id: string, data: Partial<TarefaPrisma>): Promise<TarefaPrisma> {
    const tarefa = await this.findById(id);

    if (!tarefa) {
      throw new NotFoundException('Tarefa não encontrada');
    }

    return this.prismaService.tarefaPrisma.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<void> {
    const tarefa = await this.findById(id);

    if (!tarefa) {
      throw new NotFoundException('Tarefa não encontrada');
    }

    await this.prismaService.tarefaPrisma.delete({
      where: { id },
    });
  }
}
