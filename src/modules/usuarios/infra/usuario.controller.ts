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
import { AtualizaUsuarioDto } from '../dto/atualiza-usuario.dto';
import { CriaUsuarioDto } from '../dto/cria-usuario.dto';
import { Roles } from 'src/modules/auth/roles/roles.decorator';
import { RolesGuard } from 'src/modules/auth/infra/guard/roles.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Usuario } from '@prisma/client';
import { AtualizarUsuarioUseCase } from '../usecases/atualizar-usuario.usecase';
import { BuscarPorIdUsuarioUseCase } from '../usecases/buscar-por-id-usuario.usecase';
import { BuscarUsuariosPaginacaoUseCase } from '../usecases/buscar-usuarios-paginacao.usecase';
import { CriarUsuarioUseCase } from '../usecases/criar-usuario.usecase';
import { DeletarUsuarioUseCase } from '../usecases/deletar-usuario.usecase';
import { EnumUsuarioNivel } from '../enum/usuario-nivel.enum';
import { PaginateUsuarioDto } from '../dto/paginate-usuario.dto';
import { AtualizaPerfilUsuarioDto } from '../dto/atualiza-perfil.dto';
import { AtualizarPerfilUsuarioUseCase } from '../usecases/atualiza-perfil.usecase';
import { Request } from 'express';
import { UsuarioEntity } from '../entity/usuario.entity';

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
  @Roles(EnumUsuarioNivel.ADMIN)
  @UseGuards(AuthGuard(), RolesGuard)
  async cria(@Body() dados: CriaUsuarioDto): Promise<UsuarioEntity> {
    return this.criarUsuarioUseCase.execute(dados);
  }

  @Get()
  @UseGuards(AuthGuard())
  async buscaTodos(@Query() queryPrams?: PaginateUsuarioDto) {
    return this.buscarUsuariosPaginacaoUseCase.execute(queryPrams);
  }

  @Get('/:id')
  @UseGuards(AuthGuard())
  async buscaPorId(@Param('id') id: string): Promise<UsuarioEntity> {
    return this.buscarPorIdUsuarioUseCase.execute(id);
  }

  @Put('/perfil/')
  @UseGuards(AuthGuard())
  async atualizaPerfil(
    @Body() data: AtualizaPerfilUsuarioDto,
    @Req() req: Request,
  ): Promise<void> {
    const userId = req.user.id;
    return this.atualizaPerfilUsuarioUseCase.execute(userId, data);
  }

  @Put('/:id')
  @UseGuards(AuthGuard())
  async atualiza(
    @Param('id') id: string,
    @Body() data: AtualizaUsuarioDto,
  ): Promise<void> {
    return this.atualizarUsuarioUseCase.execute(id, data);
  }

  @Delete('/:id')
  @Roles(EnumUsuarioNivel.ADMIN)
  @UseGuards(AuthGuard(), RolesGuard)
  async deleta(@Param('id') id: string): Promise<void> {
    return this.deletarUsuarioUseCase.execute(id);
  }
}
