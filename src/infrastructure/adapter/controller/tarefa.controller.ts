import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { TarefaStatusEnum } from 'src/domain/enum/tarefa-status.enum';
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
  status: TarefaStatusEnum;
};

@Controller('tarefa')
export class TarefaController {
  constructor(
    private readonly tarefaPrismaRepository: TarefaPrismaRepository,
  ) {}

  @Post()
  getAll(@Body() body: CreateTarefaDto) {
    console.log(body);

    return this.tarefaPrismaRepository.create(body);
  }

  @Patch(':id')
  updateDescription(
    @Param('id') id: string,
    @Body() body: Partial<UpdateTarefaDto>,
  ) {
    return this.tarefaPrismaRepository.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.tarefaPrismaRepository.delete(id);
  }
}
