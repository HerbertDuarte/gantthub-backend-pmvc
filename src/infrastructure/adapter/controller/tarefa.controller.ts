import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { TarefaPrisma } from '@prisma/client';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';
import { CriarTarefaUseCase } from '@/src/domain/application/usecases/tarefa/criar-tarefa.usecase';
import { BuscarPorIdTarefaUseCase } from '@/src/domain/application/usecases/tarefa/buscar-por-id-tarefa.usecase';
import { AtualizarTarefaUseCase } from '@/src/domain/application/usecases/tarefa/atualizar-tarefa.usecase';
import { DeletarTarefaUseCase } from '@/src/domain/application/usecases/tarefa/deletar-tarefa.usecase';
import { AtualizaStatusTarefaUsecase } from '@/src/domain/application/usecases/tarefa/atualiza-status-tarefa.usecase';
import { CriaTarefaDto } from '@/src/domain/application/dto/tarefa/cria-tarefa.dto';
import { AtualizaTarefaDto } from '@/src/domain/application/dto/tarefa/atualiza-tarefa.dto';

@Controller('tarefa')
export class TarefaController {
  constructor(
    private readonly criarTarefaUseCase: CriarTarefaUseCase,
    private readonly buscarPorIdTarefaUseCase: BuscarPorIdTarefaUseCase,
    private readonly atualizarTarefaUseCase: AtualizarTarefaUseCase,
    private readonly deletarTarefaUseCase: DeletarTarefaUseCase,
    private readonly atualizaStatusTarefaUseCase: AtualizaStatusTarefaUsecase,
  ) {}

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getOne(@Param('id') id: string): Promise<TarefaPrisma> {
    return this.buscarPorIdTarefaUseCase.execute(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() dados: CriaTarefaDto): Promise<TarefaPrisma> {
    return this.criarTarefaUseCase.execute(dados);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() data: AtualizaTarefaDto,
  ): Promise<TarefaPrisma> {
    return this.atualizarTarefaUseCase.execute(id, data);
  }

  @Patch(':id/status')
  @UseGuards(JwtAuthGuard)
  async updateStatus(
    @Body() { status, justificativa }: Partial<TarefaPrisma>,
    @Param('id') tarefaId: string,
  ) {
    return this.atualizaStatusTarefaUseCase.execute(
      { status, justificativa },
      tarefaId,
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: string): Promise<void> {
    return this.deletarTarefaUseCase.execute(id);
  }
}
