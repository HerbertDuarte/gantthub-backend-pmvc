import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { MarcoPrisma } from '@prisma/client';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';
import { CriarMarcoUseCase } from '@/src/domain/application/usecases/marco/criar-marco.usecase';
import { BuscarPorIdMarcoUseCase } from '@/src/domain/application/usecases/marco/buscar-por-id-marco.usecase';
import { AtualizarMarcoUseCase } from '@/src/domain/application/usecases/marco/atualizar-marco.usecase';
import { DeletarMarcoUseCase } from '@/src/domain/application/usecases/marco/deletar-marco.usecase';
import { CriaMarcoDto } from '@/src/domain/application/dto/marco/cria-marco.dto';
import { AtualizaMarcoDto } from '@/src/domain/application/dto/marco/atualiza-marco.dto';

@Controller('marco')
export class MarcoController {
  constructor(
    private readonly criarMarcoUseCase: CriarMarcoUseCase,
    private readonly buscarPorIdMarcoUseCase: BuscarPorIdMarcoUseCase,
    private readonly atualizarMarcoUseCase: AtualizarMarcoUseCase,
    private readonly deletarMarcoUseCase: DeletarMarcoUseCase,
  ) {}

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getOne(@Param('id') id: string): Promise<MarcoPrisma> {
    return this.buscarPorIdMarcoUseCase.execute(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() body: CriaMarcoDto): Promise<MarcoPrisma> {
    return this.criarMarcoUseCase.execute(body);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() data: AtualizaMarcoDto,
  ): Promise<MarcoPrisma> {
    return this.atualizarMarcoUseCase.execute(id, data);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: string): Promise<void> {
    return this.deletarMarcoUseCase.execute(id);
  }
}
