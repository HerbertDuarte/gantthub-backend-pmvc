import { PrismaService } from '@/src/infrastructure/plugins/database/services/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { SubTarefaPrisma } from '@prisma/client';

@Injectable()
export class SubTarefaPrismaRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(subtarefa: SubTarefaPrisma): Promise<SubTarefaPrisma> {
    return this.prismaService.subTarefaPrisma.create({ data: subtarefa });
  }

  async findById(id: string): Promise<SubTarefaPrisma> {
    const subtarefa = await this.prismaService.subTarefaPrisma.findUnique({
      where: { id },
    });

    if (!subtarefa) {
      throw new NotFoundException('Sub tarefa não encontrada');
    }

    return subtarefa;
  }

  async update(
    id: string,
    data: Partial<SubTarefaPrisma>,
  ): Promise<SubTarefaPrisma> {
    const subtarefa = await this.findById(id);

    if (!subtarefa) {
      throw new NotFoundException('Sub tarefa não encontrada');
    }

    return this.prismaService.subTarefaPrisma.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<void> {
    const subtarefa = await this.findById(id);

    if (!subtarefa) {
      throw new NotFoundException('Sub tarefa não encontrada');
    }

    await this.prismaService.subTarefaPrisma.delete({
      where: { id },
    });
  }
}
