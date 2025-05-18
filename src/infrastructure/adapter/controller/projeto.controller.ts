import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ProjetoPrisma, UsuarioPrisma } from '@prisma/client';
import { PaginateResponse } from 'lib-test-herbert';
import { PaginateProjetoDto } from '@/src/domain/application/dto/projeto/paginate-projeto.dto';
import { PaginateUsuarioProjetoDto } from '@/src/domain/application/dto/usuario/paginate-usuario-projeto.dto';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';
import { Request } from 'express';
import { BuscarProjetosPaginacaoUseCase } from '@/src/domain/application/usecases/projeto/buscar-projetos-paginacao.usecase';
import { BuscarPorIdProjetoUseCase } from '@/src/domain/application/usecases/projeto/buscar-por-id-projeto.usecase';
import { BuscarPorIdReduzidoProjetoUseCase } from '@/src/domain/application/usecases/projeto/buscar-por-id-reduzido-projeto.usecase';
import { BuscarUsuariosProjetoUseCase } from '@/src/domain/application/usecases/projeto/buscar-usuarios-projeto.usecase';
import { BuscarUsuariosComPrioridadeProjetoUseCase } from '@/src/domain/application/usecases/projeto/buscar-usuarios-com-prioridade-projeto.usecase';
import { CriarProjetoUseCase } from '@/src/domain/application/usecases/projeto/criar-projeto.usecase';
import { AtualizarProjetoUseCase } from '@/src/domain/application/usecases/projeto/atualizar-projeto.usecase';
import { DeletarProjetoUseCase } from '@/src/domain/application/usecases/projeto/deletar-projeto.usecase';
import { CriaProjetoDto } from '@/src/domain/application/dto/projeto/cria-projeto.dto';
import { AtualizaProjetoDto } from '@/src/domain/application/dto/projeto/atualiza-projeto.dto';

@ApiBearerAuth()
@Controller('projeto')
@ApiTags('Projetos')
export class ProjetoController {
  constructor(
    private readonly buscarProjetosPaginacaoUseCase: BuscarProjetosPaginacaoUseCase,
    private readonly buscarPorIdProjetoUseCase: BuscarPorIdProjetoUseCase,
    private readonly buscarPorIdReduzidoProjetoUseCase: BuscarPorIdReduzidoProjetoUseCase,
    private readonly buscarUsuariosProjetoUseCase: BuscarUsuariosProjetoUseCase,
    private readonly buscarUsuariosComPrioridadeProjetoUseCase: BuscarUsuariosComPrioridadeProjetoUseCase,
    private readonly criarProjetoUseCase: CriarProjetoUseCase,
    private readonly atualizarProjetoUseCase: AtualizarProjetoUseCase,
    private readonly deletarProjetoUseCase: DeletarProjetoUseCase,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(
    @Req() req: Request,
    @Query() props?: PaginateProjetoDto,
  ): Promise<PaginateResponse<ProjetoPrisma>> {
    return this.buscarProjetosPaginacaoUseCase.execute(props, req.user.id);
  }

  @Get('usuarios/:projetoId')
  @UseGuards(JwtAuthGuard)
  async findUsuariosComPrioridade(
    @Param('projetoId') projetoId: string,
    @Req() req: Request,
    @Query() props?: PaginateUsuarioProjetoDto,
  ): Promise<PaginateResponse<UsuarioPrisma>> {
    return this.buscarUsuariosComPrioridadeProjetoUseCase.execute(
      projetoId,
      props,
      req.user.id,
    );
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getOne(
    @Param('id') projetoId: string,
    @Req() req: Request,
  ): Promise<ProjetoPrisma> {
    return this.buscarPorIdProjetoUseCase.execute(projetoId, req.user.id);
  }

  @Get(':id/reduced')
  @UseGuards(JwtAuthGuard)
  async getOneReduced(
    @Param('id') projetoId: string,
    @Req() req: Request,
  ): Promise<ProjetoPrisma> {
    return this.buscarPorIdReduzidoProjetoUseCase.execute(
      projetoId,
      req.user.id,
    );
  }

  @Get(':id/usuarios')
  @UseGuards(JwtAuthGuard)
  async getUsuariosDoProjeto(
    @Param('id') projetoId: string,
    @Req() req: Request,
  ): Promise<UsuarioPrisma[]> {
    return this.buscarUsuariosProjetoUseCase.execute(projetoId, req.user.id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() dados: CriaProjetoDto,
    @Req() req: Request,
  ): Promise<ProjetoPrisma> {
    return this.criarProjetoUseCase.execute(dados, req.user.id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Body() dados: AtualizaProjetoDto,
    @Param('id') projetoId: string,
    @Req() req: Request,
  ): Promise<ProjetoPrisma> {
    return this.atualizarProjetoUseCase.execute(projetoId, dados, req.user.id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(
    @Param('id') projetoId: string,
    @Req() req: Request,
  ): Promise<void> {
    return this.deletarProjetoUseCase.execute(projetoId, req.user.id);
  }
}
