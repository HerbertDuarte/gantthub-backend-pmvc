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
import { UsuarioPrisma, UsuarioProjetoPrisma } from '@prisma/client';
import { VincularUsuarioProjetoUseCase } from '@/src/domain/application/usecases/usuario-projeto/vincular-usuario-projeto.usecase';
import { DesvincularUsuarioProjetoUseCase } from '@/src/domain/application/usecases/usuario-projeto/desvincular-usuario-projeto.usecase';
import { BuscarPorUsuarioUsuarioProjetoUseCase } from '@/src/domain/application/usecases/usuario-projeto/buscar-por-usuario.usecase';
import { BuscarPorProjetoUsuarioProjetoUseCase } from '@/src/domain/application/usecases/usuario-projeto/buscar-por-projeto.usecase';
import { AdicionaUsuarioProjetoDto } from '@/src/domain/application/dto/usuario-projeto/adiciona-usuario-projeto.dto';
import { BuscarUsuariosProjetoPaginacaoUseCase } from '@/src/domain/application/usecases/usuario-projeto/buscar-usuarios-projeto-paginacao.usecase';
import { PaginateUsuarioProjetoDto } from '@/src/domain/application/dto/usuario/paginate-usuario-projeto.dto';
import { PaginateResponse } from 'lib-test-herbert';

@ApiTags('Usuários-Projetos')
@Controller('usuario-projeto')
@ApiBearerAuth()
export class UsuarioProjetoController {
  constructor(
    private readonly vincularUsuarioProjetoUseCase: VincularUsuarioProjetoUseCase,
    private readonly desvincularUsuarioProjetoUseCase: DesvincularUsuarioProjetoUseCase,
    private readonly buscarPorUsuarioUseCase: BuscarPorUsuarioUsuarioProjetoUseCase,
    private readonly buscarPorProjetoUseCase: BuscarPorProjetoUsuarioProjetoUseCase,
    private readonly buscarUsuariosProjetoPaginacaoUseCase: BuscarUsuariosProjetoPaginacaoUseCase,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async vincular(
    @Body() dados: AdicionaUsuarioProjetoDto,
  ): Promise<UsuarioProjetoPrisma> {
    return this.vincularUsuarioProjetoUseCase.execute(dados);
  }

  @Get('usuario/:usuarioId')
  @UseGuards(JwtAuthGuard)
  async listarPorUsuario(
    @Param('usuarioId') usuarioId: string,
  ): Promise<UsuarioProjetoPrisma[]> {
    return this.buscarPorUsuarioUseCase.execute(usuarioId);
  }

  @Get('projeto/:projetoId')
  @UseGuards(JwtAuthGuard)
  async listarPorProjeto(
    @Param('projetoId') projetoId: string,
  ): Promise<UsuarioProjetoPrisma[]> {
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

  @Delete('usuario/:usuarioId/projeto/:projetoId')
  @UseGuards(JwtAuthGuard)
  async desvincular(
    @Param('usuarioId') usuarioId: string,
    @Param('projetoId') projetoId: string,
  ): Promise<void> {
    return this.desvincularUsuarioProjetoUseCase.execute({
      usuarioId,
      projetoId,
    });
  }
}
