import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UsuarioSetorPrisma } from '@prisma/client';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';
import { VincularUsuarioSetorUseCase } from '@/src/domain/application/usecases/usuario-setor/vincular-usuario-setor.usecase';
import { DesvincularUsuarioSetorUseCase } from '@/src/domain/application/usecases/usuario-setor/desvincular-usuario-setor.usecase';
import { BuscarPorUsuarioUseCase } from '@/src/domain/application/usecases/usuario-setor/buscar-por-usuario.usecase';
import { BuscarPorSetorUseCase } from '@/src/domain/application/usecases/usuario-setor/buscar-por-setor.usecase';
import { CriaUsuarioSetorDto } from '@/src/domain/application/dto/usuario-setor/cria-usuario-setor.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Usuários-Setores')
@Controller('usuarios-setores')
export class UsuarioSetorController {
  constructor(
    private readonly vincularUsuarioSetorUseCase: VincularUsuarioSetorUseCase,
    private readonly desvincularUsuarioSetorUseCase: DesvincularUsuarioSetorUseCase,
    private readonly buscarPorUsuarioUseCase: BuscarPorUsuarioUseCase,
    private readonly buscarPorSetorUseCase: BuscarPorSetorUseCase,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async vincular(@Body() dados: CriaUsuarioSetorDto): Promise<void> {
    return this.vincularUsuarioSetorUseCase.execute(dados);
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

  @Delete(':usuarioId/:setorId')
  @UseGuards(JwtAuthGuard)
  async desvincular(
    @Param('usuarioId') usuarioId: string,
    @Param('setorId') setorId: string,
  ): Promise<void> {
    return this.desvincularUsuarioSetorUseCase.execute({ usuarioId, setorId });
  }
}
