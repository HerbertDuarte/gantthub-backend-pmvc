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
  BadRequestException,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { AtualizarUsuarioUseCase } from '@/src/domain/application/usecases/usuario/atualizar-usuario.usecase';
import { BuscarPorIdUsuarioUseCase } from '@/src/domain/application/usecases/usuario/buscar-por-id-usuario.usecase';
import { BuscarUsuariosPaginacaoUseCase } from '@/src/domain/application/usecases/usuario/buscar-usuarios-paginacao.usecase';
import { AtualizaUsuarioDto } from '../../../domain/application/dto/usuario/atualiza-usuario.dto';
import { CriaUsuarioDto } from '../../../domain/application/dto/usuario/cria-usuario.dto';
import { CriarUsuarioUseCase } from '../../../domain/application/usecases/usuario/criar-usuario.usecase';
import { DeletarUsuarioUseCase } from '../../../domain/application/usecases/usuario/deletar-usuario.usecase';
import { PaginateUsuarioDto } from '../../../domain/application/dto/usuario/paginate-usuario.dto';
import { AtualizaPerfilUsuarioDto } from '../../../domain/application/dto/usuario/atualiza-perfil.dto';
import { AtualizarPerfilUsuarioUseCase } from '../../../domain/application/usecases/usuario/atualiza-perfil.usecase';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';
import { UsuarioPrisma } from '@prisma/client';

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
  async cria(@Body() dados: CriaUsuarioDto): Promise<UsuarioPrisma> {
    return this.criarUsuarioUseCase.execute(dados);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(@Query() queryPrams?: PaginateUsuarioDto) {
    return this.buscarUsuariosPaginacaoUseCase.execute(queryPrams);
  }

  @Get('/perfil')
  @UseGuards(JwtAuthGuard)
  async getPerfil(@Req() req: Request) {
    const userId = req.user.id;
    return this.buscarPorIdUsuarioUseCase.execute(userId);
  }

  @Put('/perfil')
  @UseGuards(JwtAuthGuard)
  async atualizaPerfil(
    @Body() data: AtualizaPerfilUsuarioDto,
    @Req() req: Request,
  ): Promise<void> {
    const userId = req.user.id;
    return this.atualizaPerfilUsuarioUseCase.execute(userId, data);
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  async findById(@Param('id') id: string): Promise<UsuarioPrisma> {
    return this.buscarPorIdUsuarioUseCase.execute(id);
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  async deleta(@Param('id') id: string, @Req() req: Request): Promise<void> {
    if (req.user.id === id) {
      throw new BadRequestException('Não é possível deletar o próprio usuário');
    }
    return this.deletarUsuarioUseCase.execute(id);
  }

  @Put('/:id')
  @UseGuards(JwtAuthGuard)
  async atualiza(@Param('id') id: string, @Body() data: AtualizaUsuarioDto) {
    return this.atualizarUsuarioUseCase.execute(id, data);
  }
}
