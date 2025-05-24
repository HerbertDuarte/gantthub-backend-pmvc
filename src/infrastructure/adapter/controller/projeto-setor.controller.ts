import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ProjetoSetorPrisma, SetorPrisma, ProjetoPrisma } from '@prisma/client';
import { PaginateResponse } from 'lib-test-herbert';
import { VincularProjetoSetorUseCase } from '@/src/domain/application/usecases/projeto-setor/vincular-projeto-setor.usecase';
import { DesvincularProjetoSetorUseCase } from '@/src/domain/application/usecases/projeto-setor/desvincular-projeto-setor.usecase';
import { BuscarPorProjetoProjetoSetorUseCase } from '@/src/domain/application/usecases/projeto-setor/buscar-por-projeto.usecase';
import { BuscarPorSetorProjetoSetorUseCase } from '@/src/domain/application/usecases/projeto-setor/buscar-por-setor.usecase';
import { BuscarTodosProjetoSetorUseCase } from '@/src/domain/application/usecases/projeto-setor/buscar-todos.usecase';
import { BuscarSetoresProjetoPaginacaoUseCase } from '@/src/domain/application/usecases/projeto-setor/buscar-setores-projeto-paginacao.usecase';
import { BuscarProjetosSetorPaginacaoUseCase } from '@/src/domain/application/usecases/projeto-setor/buscar-projetos-setor-paginacao.usecase';
import { CriaProjetoSetorDto } from '@/src/domain/application/dto/projeto-setor/cria-projeto-setor.dto';
import { PaginateSetorProjetoDto } from '@/src/domain/application/dto/projeto-setor/paginate-setor-projeto.dto';
import { PaginateProjetoSetorDto } from '@/src/domain/application/dto/projeto-setor/paginate-projeto-setor.dto';

@ApiTags('Projetos-Setores')
@Controller('projeto-setor')
@ApiBearerAuth()
export class ProjetoSetorController {
  constructor(
    private readonly vincularProjetoSetorUseCase: VincularProjetoSetorUseCase,
    private readonly desvincularProjetoSetorUseCase: DesvincularProjetoSetorUseCase,
    private readonly buscarPorProjetoUseCase: BuscarPorProjetoProjetoSetorUseCase,
    private readonly buscarPorSetorUseCase: BuscarPorSetorProjetoSetorUseCase,
    private readonly buscarTodosUseCase: BuscarTodosProjetoSetorUseCase,
    private readonly buscarSetoresProjetoPaginacaoUseCase: BuscarSetoresProjetoPaginacaoUseCase,
    private readonly buscarProjetosSetorPaginacaoUseCase: BuscarProjetosSetorPaginacaoUseCase,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async vincular(
    @Body() dados: CriaProjetoSetorDto,
  ): Promise<ProjetoSetorPrisma> {
    return this.vincularProjetoSetorUseCase.execute(dados);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async listarTodos(): Promise<ProjetoSetorPrisma[]> {
    return this.buscarTodosUseCase.execute();
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

  @Get('setores-projeto/:projetoId')
  @UseGuards(JwtAuthGuard)
  async listarSetoresProjetoPaginacao(
    @Param('projetoId') projetoId: string,
    @Query() props?: PaginateSetorProjetoDto,
  ): Promise<PaginateResponse<SetorPrisma>> {
    return this.buscarSetoresProjetoPaginacaoUseCase.execute(projetoId, props);
  }

  @Get('projetos-setor/:setorId')
  @UseGuards(JwtAuthGuard)
  async listarProjetosSetorPaginacao(
    @Param('setorId') setorId: string,
    @Query() props?: PaginateProjetoSetorDto,
  ): Promise<PaginateResponse<ProjetoPrisma>> {
    return this.buscarProjetosSetorPaginacaoUseCase.execute(setorId, props);
  }

  @Delete('projeto/:projetoId/setor/:setorId')
  @UseGuards(JwtAuthGuard)
  async desvincular(
    @Param('projetoId') projetoId: string,
    @Param('setorId') setorId: string,
  ): Promise<void> {
    return this.desvincularProjetoSetorUseCase.execute({
      projetoId,
      setorId,
    });
  }
}
