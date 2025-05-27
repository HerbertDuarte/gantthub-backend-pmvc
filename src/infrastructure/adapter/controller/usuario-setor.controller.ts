import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UsuarioSetorPrisma } from '@prisma/client';
import { VincularUsuarioSetorUseCase } from '@/src/domain/application/usecases/usuario-setor/vincular-usuario-setor.usecase';
import { DesvincularUsuarioSetorUseCase } from '@/src/domain/application/usecases/usuario-setor/desvincular-usuario-setor.usecase';
import { BuscarPorUsuarioUsuarioSetorUseCase } from '@/src/domain/application/usecases/usuario-setor/buscar-por-usuario.usecase';
import { BuscarPorSetorUsuarioSetorUseCase } from '@/src/domain/application/usecases/usuario-setor/buscar-por-setor.usecase';
import { BuscarTodosUsuarioSetorUseCase } from '@/src/domain/application/usecases/usuario-setor/buscar-todos.usecase';
import { CriaUsuarioSetorDto } from '@/src/domain/application/dto/usuario-setor/cria-usuario-setor.dto';

@ApiTags('Usuarios-Setores')
@Controller('usuario-setor')
@ApiBearerAuth()
export class UsuarioSetorController {
  constructor(
    private readonly vincularUsuarioSetorUseCase: VincularUsuarioSetorUseCase,
    private readonly desvincularUsuarioSetorUseCase: DesvincularUsuarioSetorUseCase,
    private readonly buscarPorUsuarioUseCase: BuscarPorUsuarioUsuarioSetorUseCase,
    private readonly buscarPorSetorUseCase: BuscarPorSetorUsuarioSetorUseCase,
    private readonly buscarTodosUseCase: BuscarTodosUsuarioSetorUseCase,
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

  @Get('setor/:setorId')
  @UseGuards(JwtAuthGuard)
  async listarPorSetor(
    @Param('setorId') setorId: string,
  ): Promise<UsuarioSetorPrisma[]> {
    return this.buscarPorSetorUseCase.execute(setorId);
  }

  @Delete('usuario/:usuarioId/setor/:setorId')
  @UseGuards(JwtAuthGuard)
  async desvincular(
    @Param('usuarioId') usuarioId: string,
    @Param('setorId') setorId: string,
  ): Promise<void> {
    return this.desvincularUsuarioSetorUseCase.execute({
      usuarioId,
      setorId,
    });
  }
}
