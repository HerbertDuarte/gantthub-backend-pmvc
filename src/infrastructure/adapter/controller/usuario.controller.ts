import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Param,
  Delete,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { AtualizarUsuarioUseCase } from 'src/domain/application/usecases/usuario/atualizar-usuario.usecase';
import { BuscarPorIdUsuarioUseCase } from 'src/domain/application/usecases/usuario/buscar-por-id-usuario.usecase';
import { BuscarUsuariosPaginacaoUseCase } from 'src/domain/application/usecases/usuario/buscar-usuarios-paginacao.usecase';

import { AtualizaUsuarioDto } from '../../../domain/application/dto/usuario/atualiza-usuario.dto';
import { CriaUsuarioDto } from '../../../domain/application/dto/usuario/cria-usuario.dto';
import { CriarUsuarioUseCase } from '../../../domain/application/usecases/usuario/criar-usuario.usecase';
import { DeletarUsuarioUseCase } from '../../../domain/application/usecases/usuario/deletar-usuario.usecase';
import { PaginateUsuarioDto } from '../../../domain/application/dto/usuario/paginate-usuario.dto';
import { AtualizaPerfilUsuarioDto } from '../../../domain/application/dto/usuario/atualiza-perfil.dto';
import { AtualizarPerfilUsuarioUseCase } from '../../../domain/application/usecases/usuario/atualiza-perfil.usecase';
import { Usuario } from '../../../domain/entity/usuario';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';

@ApiBearerAuth()
@Controller('usuarios')
@ApiTags('Usuários')
export class UsuarioController {
  constructor(
    private readonly criarUsuarioUseCase: CriarUsuarioUseCase,
    private readonly atualizarUsuarioUseCase: AtualizarUsuarioUseCase,
    private readonly buscarPorIdUsuarioUseCase: BuscarPorIdUsuarioUseCase,
    private readonly buscarUsuariosPaginacaoUseCase: BuscarUsuariosPaginacaoUseCase,
    private readonly deletarUsuarioUseCase: DeletarUsuarioUseCase,
    private readonly atualizaPerfilUsuarioUseCase: AtualizarPerfilUsuarioUseCase,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async cria(@Body() dados: CriaUsuarioDto): Promise<Usuario> {
    return this.criarUsuarioUseCase.execute(dados);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(@Query() queryPrams?: PaginateUsuarioDto) {
    return this.buscarUsuariosPaginacaoUseCase.execute(queryPrams);
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  async findById(@Param('id') id: string): Promise<Usuario> {
    return this.buscarPorIdUsuarioUseCase.execute(id);
  }

  @Get('/perfil')
  @UseGuards(JwtAuthGuard)
  async getPerfil(@Req() req: Request) {
    const userId = req.user.getId();
    return this.buscarPorIdUsuarioUseCase.execute(userId);
  }

  @Put('/perfil')
  @UseGuards(JwtAuthGuard)
  async atualizaPerfil(
    @Body() data: AtualizaPerfilUsuarioDto,
    @Req() req: Request,
  ): Promise<void> {
    const userId = req.user.getId();
    return this.atualizaPerfilUsuarioUseCase.execute(userId, data);
  }
}
