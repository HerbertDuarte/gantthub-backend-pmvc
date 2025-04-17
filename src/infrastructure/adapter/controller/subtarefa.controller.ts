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
import { SubTarefaPrisma } from '@prisma/client';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';
import { CriarSubTarefaUseCase } from '@/src/domain/application/usecases/subtarefa/criar-subtarefa.usecase';
import { BuscarPorIdSubTarefaUseCase } from '@/src/domain/application/usecases/subtarefa/buscar-por-id-subtarefa.usecase';
import { AtualizarSubTarefaUseCase } from '@/src/domain/application/usecases/subtarefa/atualizar-subtarefa.usecase';
import { DeletarSubTarefaUseCase } from '@/src/domain/application/usecases/subtarefa/deletar-subtarefa.usecase';
import { AtualizaStatusSubTarefaUsecase } from '@/src/domain/application/usecases/subtarefa/atualiza-status-subtarefa.usecase';
import { CriaSubTarefaDto } from '@/src/domain/application/dto/subtarefa/cria-subtarefa.dto';
import { AtualizaSubTarefaDto } from '@/src/domain/application/dto/subtarefa/atualiza-subtarefa.dto';

@Controller('subtarefa')
export class SubTarefaController {
  constructor(
    private readonly criarSubTarefaUseCase: CriarSubTarefaUseCase,
    private readonly buscarPorIdSubTarefaUseCase: BuscarPorIdSubTarefaUseCase,
    private readonly atualizarSubTarefaUseCase: AtualizarSubTarefaUseCase,
    private readonly deletarSubTarefaUseCase: DeletarSubTarefaUseCase,
    private readonly atualizaStatusSubTarefaUseCase: AtualizaStatusSubTarefaUsecase,
  ) {}

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getOne(@Param('id') id: string): Promise<SubTarefaPrisma> {
    return this.buscarPorIdSubTarefaUseCase.execute(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() dados: CriaSubTarefaDto): Promise<SubTarefaPrisma> {
    return this.criarSubTarefaUseCase.execute(dados);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() data: AtualizaSubTarefaDto,
  ): Promise<SubTarefaPrisma> {
    return this.atualizarSubTarefaUseCase.execute(id, data);
  }

  @Patch(':id/status')
  @UseGuards(JwtAuthGuard)
  async updateStatus(
    @Body() { status, justificativa }: Partial<SubTarefaPrisma>,
    @Param('id') subTarefaId: string,
  ) {
    return this.atualizaStatusSubTarefaUseCase.execute(
      { status, justificativa },
      subTarefaId,
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: string): Promise<void> {
    return this.deletarSubTarefaUseCase.execute(id);
  }
}
