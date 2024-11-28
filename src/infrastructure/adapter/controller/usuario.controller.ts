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
import { AtualizaUsuarioDto } from '../../../domain/application/dto/usuario/atualiza-usuario.dto';
import { CriaUsuarioDto } from '../../../domain/application/dto/usuario/cria-usuario.dto';
import { RolesGuard } from 'src/infrastructure/adapter/guard/roles.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AtualizarUsuarioUseCase } from '../../../domain/application/usecases/atualizar-usuario.usecase';
import { BuscarPorIdUsuarioUseCase } from '../../../domain/application/usecases/buscar-por-id-usuario.usecase';
import { BuscarUsuariosPaginacaoUseCase } from '../../../domain/application/usecases/buscar-usuarios-paginacao.usecase';
import { CriarUsuarioUseCase } from '../../../domain/application/usecases/criar-usuario.usecase';
import { DeletarUsuarioUseCase } from '../../../domain/application/usecases/deletar-usuario.usecase';
import { PaginateUsuarioDto } from '../../../domain/application/dto/usuario/paginate-usuario.dto';
import { AtualizaPerfilUsuarioDto } from '../../../domain/application/dto/usuario/atualiza-perfil.dto';
import { AtualizarPerfilUsuarioUseCase } from '../../../domain/application/usecases/atualiza-perfil.usecase';
import { Request } from 'express';
import { UsuarioEntity } from '../../../domain/entity/usuario.entity';

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
  @UseGuards(AuthGuard(), RolesGuard)
  async deleta(@Param('id') id: string): Promise<void> {
    return this.deletarUsuarioUseCase.execute(id);
  }
}
