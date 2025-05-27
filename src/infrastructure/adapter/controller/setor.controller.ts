import {
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
import { SetorPrisma } from '@prisma/client';
import { PaginateResponse } from 'lib-test-herbert';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';
import { CriarSetorUseCase } from '@/src/domain/application/usecases/setor/criar-setor.usecase';
import { BuscarPorIdSetorUseCase } from '@/src/domain/application/usecases/setor/buscar-por-id-setor.usecase';
import { BuscarSetoresPaginacaoUseCase } from '@/src/domain/application/usecases/setor/buscar-setores-paginacao.usecase';
import { AtualizarSetorUseCase } from '@/src/domain/application/usecases/setor/atualizar-setor.usecase';
import { DeletarSetorUseCase } from '@/src/domain/application/usecases/setor/deletar-setor.usecase';
import { CriaSetorDto } from '@/src/domain/application/dto/setor/cria-setor.dto';
import { AtualizaSetorDto } from '@/src/domain/application/dto/setor/atualiza-setor.dto';
import { PaginateSetorDto } from '@/src/domain/application/dto/setor/paginate-setor.dto';
import { BuscarSetoresUseCase } from '@/src/domain/application/usecases/setor/buscar-setores.usecase';
import { Request } from 'express';
import { EnumRoleUsuario } from '@/src/domain/enum/usuario-role.enum';

@ApiBearerAuth()
@Controller('setor')
@ApiTags('Setores')
export class SetorController {
  constructor(
    private readonly criarSetorUseCase: CriarSetorUseCase,
    private readonly buscarPorIdSetorUseCase: BuscarPorIdSetorUseCase,
    private readonly buscarSetoresPaginacaoUseCase: BuscarSetoresPaginacaoUseCase,
    private readonly atualizarSetorUseCase: AtualizarSetorUseCase,
    private readonly deletarSetorUseCase: DeletarSetorUseCase,
    private readonly buscarSetoresUseCase: BuscarSetoresUseCase,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(
    @Query() props?: PaginateSetorDto,
  ): Promise<PaginateResponse<SetorPrisma>> {
    return this.buscarSetoresPaginacaoUseCase.execute(props);
  }

  @Get('all')
  @UseGuards(JwtAuthGuard)
  async findAllWithoutPagination(@Req() req: Request): Promise<SetorPrisma[]> {
    if (req.user.role !== EnumRoleUsuario.ADMIN) {
      return this.buscarSetoresUseCase.execute(req.user.id);
    }
    return this.buscarSetoresUseCase.execute();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findById(@Param('id') id: string): Promise<SetorPrisma> {
    return this.buscarPorIdSetorUseCase.execute(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() data: CriaSetorDto): Promise<SetorPrisma> {
    return this.criarSetorUseCase.execute(data);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() data: AtualizaSetorDto,
  ): Promise<SetorPrisma> {
    return this.atualizarSetorUseCase.execute(id, data);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: string): Promise<void> {
    return this.deletarSetorUseCase.execute(id);
  }
}
