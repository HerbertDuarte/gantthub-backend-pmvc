import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { SetorPrisma } from '@prisma/client';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';
import { CriarSetorUseCase } from '@/src/domain/application/usecases/setor/criar-setor.usecase';
import { BuscarPorIdSetorUseCase } from '@/src/domain/application/usecases/setor/buscar-por-id-setor.usecase';
import { AtualizarSetorUseCase } from '@/src/domain/application/usecases/setor/atualizar-setor.usecase';
import { DeletarSetorUseCase } from '@/src/domain/application/usecases/setor/deletar-setor.usecase';
import { CriaSetorDto } from '@/src/domain/application/dto/setor/cria-setor.dto';
import { AtualizaSetorDto } from '@/src/domain/application/dto/setor/atualiza-setor.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SetorPrismaRepository } from '@/src/infrastructure/repository/setor-prisma.repository';
import { ListarSetoresUseCase } from '@/src/domain/application/usecases/setor/listar-setores.usecase';

@ApiBearerAuth()
@Controller('setor')
@ApiTags('Setores')
export class SetorController {
  constructor(
    private readonly criarSetorUseCase: CriarSetorUseCase,
    private readonly buscarPorIdSetorUseCase: BuscarPorIdSetorUseCase,
    private readonly atualizarSetorUseCase: AtualizarSetorUseCase,
    private readonly deletarSetorUseCase: DeletarSetorUseCase,
    private readonly listarSetoresUseCase: ListarSetoresUseCase,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(): Promise<SetorPrisma[]> {
    return this.listarSetoresUseCase.execute();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getOne(@Param('id') id: string): Promise<SetorPrisma> {
    return this.buscarPorIdSetorUseCase.execute(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() dados: CriaSetorDto): Promise<SetorPrisma> {
    return this.criarSetorUseCase.execute(dados);
  }

  @Put(':id')
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
