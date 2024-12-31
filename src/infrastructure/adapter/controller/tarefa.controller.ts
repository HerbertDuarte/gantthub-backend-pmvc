import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { TarefaPrismaRepository } from 'src/infrastructure/repository/tarefa-prisma.repository';

export type CreateTarefaDto = {
  nome: string;
  descricao?: string;
  dataInicio: Date;
  dataFim: Date;
  marcoId: string;
};

export type UpdateTarefaDto = {
  descricao: string;
  nome: string;
};

@Controller('tarefa')
export class TarefaController {
  constructor(
    private readonly tarefaPrismaRepository: TarefaPrismaRepository,
  ) {}

  @Post()
  getAll(@Body() body: CreateTarefaDto) {
    return this.tarefaPrismaRepository.create(body);
  }

  @Patch(':id')
  updateDescription(
    @Param('id') id: string,
    @Body() body: Partial<UpdateTarefaDto>,
  ) {
    return this.tarefaPrismaRepository.update(id, body);
  }
}
