import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ProjetoSetorPrisma } from '@prisma/client';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';
import { VincularProjetoSetorUseCase } from '@/src/domain/application/usecases/projeto-setor/vincular-projeto-setor.usecase';
import { DesvincularProjetoSetorUseCase } from '@/src/domain/application/usecases/projeto-setor/desvincular-projeto-setor.usecase';
import { BuscarPorProjetoProjetoSetorUseCase } from '@/src/domain/application/usecases/projeto-setor/buscar-por-projeto.usecase';
import { BuscarPorSetorProjetoSetorUseCase } from '@/src/domain/application/usecases/projeto-setor/buscar-por-setor.usecase';
import { CriaProjetoSetorDto } from '@/src/domain/application/dto/projeto-setor/cria-projeto-setor.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Projetos-Setores')
@ApiBearerAuth()
@Controller('projetos-setores')
export class ProjetoSetorController {
  constructor(
    private readonly vincularProjetoSetorUseCase: VincularProjetoSetorUseCase,
    private readonly desvincularProjetoSetorUseCase: DesvincularProjetoSetorUseCase,
    private readonly buscarPorProjetoUseCase: BuscarPorProjetoProjetoSetorUseCase,
    private readonly buscarPorSetorUseCase: BuscarPorSetorProjetoSetorUseCase,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async vincular(@Body() dados: CriaProjetoSetorDto): Promise<void> {
    return this.vincularProjetoSetorUseCase.execute(dados);
  }

  @Get('projeto/:projetoId')
  @UseGuards(JwtAuthGuard)
  async listarPorProjeto(
    @Param('projetoId') projetoId: string,
  ): Promise<ProjetoSetorPrisma[]> {
    return this.buscarPorProjetoUseCase.execute(projetoId);
  }

  @Get('setor/:setorId')
  @UseGuards(JwtAuthGuard)
  async listarPorSetor(
    @Param('setorId') setorId: string,
  ): Promise<ProjetoSetorPrisma[]> {
    return this.buscarPorSetorUseCase.execute(setorId);
  }

  @Delete(':projetoId/:setorId')
  @UseGuards(JwtAuthGuard)
  async desvincular(
    @Param('projetoId') projetoId: string,
    @Param('setorId') setorId: string,
  ): Promise<void> {
    return this.desvincularProjetoSetorUseCase.execute({ projetoId, setorId });
  }
}
