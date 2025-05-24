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
import {
  UsuarioSetorPrisma,
  UsuarioPrisma,
  ProjetoPrisma,
} from '@prisma/client';
import { PaginateResponse } from 'lib-test-herbert';
import { VincularUsuarioSetorUseCase } from '@/src/domain/application/usecases/usuario-setor/vincular-usuario-setor.usecase';
import { DesvincularUsuarioSetorUseCase } from '@/src/domain/application/usecases/usuario-setor/desvincular-usuario-setor.usecase';
import { BuscarPorUsuarioUsuarioSetorUseCase } from '@/src/domain/application/usecases/usuario-setor/buscar-por-usuario.usecase';
import { BuscarPorProjetoUsuarioSetorUseCase } from '@/src/domain/application/usecases/usuario-setor/buscar-por-projeto.usecase';
import { BuscarTodosUsuarioSetorUseCase } from '@/src/domain/application/usecases/usuario-setor/buscar-todos.usecase';
import { BuscarUsuariosProjetoPaginacaoUseCase } from '@/src/domain/application/usecases/usuario-setor/buscar-usuarios-projeto-paginacao.usecase';
import { BuscarProjetosUsuarioPaginacaoUseCase } from '@/src/domain/application/usecases/usuario-setor/buscar-projetos-usuario-paginacao.usecase';
import { CriaUsuarioSetorDto } from '@/src/domain/application/dto/usuario-setor/cria-usuario-setor.dto';
import { PaginateUsuarioProjetoDto } from '@/src/domain/application/dto/usuario-setor/paginate-usuario-projeto.dto';
import { PaginateProjetoUsuarioDto } from '@/src/domain/application/dto/usuario-setor/paginate-projeto-usuario.dto';

@ApiTags('Usuarios-Setores')
@Controller('usuario-setor')
@ApiBearerAuth()
export class UsuarioSetorController {
  constructor(
    private readonly vincularUsuarioSetorUseCase: VincularUsuarioSetorUseCase,
    private readonly desvincularUsuarioSetorUseCase: DesvincularUsuarioSetorUseCase,
    private readonly buscarPorUsuarioUseCase: BuscarPorUsuarioUsuarioSetorUseCase,
    private readonly buscarPorProjetoUseCase: BuscarPorProjetoUsuarioSetorUseCase,
    private readonly buscarTodosUseCase: BuscarTodosUsuarioSetorUseCase,
    private readonly buscarUsuariosProjetoPaginacaoUseCase: BuscarUsuariosProjetoPaginacaoUseCase,
    private readonly buscarProjetosUsuarioPaginacaoUseCase: BuscarProjetosUsuarioPaginacaoUseCase,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async vincular(
    @Body() dados: CriaUsuarioSetorDto,
  ): Promise<UsuarioSetorPrisma> {
    return this.vincularUsuarioSetorUseCase.execute(dados);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async listarTodos(): Promise<UsuarioSetorPrisma[]> {
    return this.buscarTodosUseCase.execute();
  }

  @Get('usuario/:usuarioId')
  @UseGuards(JwtAuthGuard)
  async listarPorUsuario(
    @Param('usuarioId') usuarioId: string,
  ): Promise<UsuarioSetorPrisma[]> {
    return this.buscarPorUsuarioUseCase.execute(usuarioId);
  }

  @Get('projeto/:projetoId')
  @UseGuards(JwtAuthGuard)
  async listarPorProjeto(
    @Param('projetoId') projetoId: string,
  ): Promise<UsuarioSetorPrisma[]> {
    return this.buscarPorProjetoUseCase.execute(projetoId);
  }

  @Get('usuarios-projeto/:projetoId')
  @UseGuards(JwtAuthGuard)
  async listarUsuariosProjetoPaginacao(
    @Param('projetoId') projetoId: string,
    @Query() props?: PaginateUsuarioProjetoDto,
  ): Promise<PaginateResponse<UsuarioPrisma>> {
    return this.buscarUsuariosProjetoPaginacaoUseCase.execute(projetoId, props);
  }

  @Get('projetos-usuario/:usuarioId')
  @UseGuards(JwtAuthGuard)
  async listarProjetosUsuarioPaginacao(
    @Param('usuarioId') usuarioId: string,
    @Query() props?: PaginateProjetoUsuarioDto,
  ): Promise<PaginateResponse<ProjetoPrisma>> {
    return this.buscarProjetosUsuarioPaginacaoUseCase.execute(usuarioId, props);
  }

  @Delete('usuario/:usuarioId/projeto/:projetoId')
  @UseGuards(JwtAuthGuard)
  async desvincular(
    @Param('usuarioId') usuarioId: string,
    @Param('projetoId') projetoId: string,
  ): Promise<void> {
    return this.desvincularUsuarioSetorUseCase.execute({
      usuarioId,
      projetoId,
    });
  }
}
