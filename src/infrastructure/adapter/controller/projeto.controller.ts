import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PrismaService } from '../../plugins/database/services/prisma.service';
import { ProjetoPrisma } from '@prisma/client';
import { PaginateResponse, PaginateUtil } from 'lib-test-herbert';
import { PaginateProjetoDto } from '@/src/domain/application/dto/projeto/paginate-projeto.dto';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';

@Controller('projeto')
export class ProjetoController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(
    @Query() props?: PaginateProjetoDto,
  ): Promise<PaginateResponse<ProjetoPrisma>> {
    const { busca, pagina, itensPorPagina } = props;
    const paginateUtil = new PaginateUtil<ProjetoPrisma>(this.prisma);

    return paginateUtil.execute({
      module: 'projetoPrisma',
      busca,
      pagina,
      itensPorPagina,
      queries: {},
      orderBy: {
        nome: 'asc',
      },
    });
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getOne(@Param('id') projetoId: string) {
    const projeto = await this.prisma.projetoPrisma.findUnique({
      where: {
        id: projetoId,
      },
      include: {
        marcos: {
          include: {
            tarefas: true,
          },
        },
      },
    });
    if (!projeto) {
      throw new NotFoundException('Projeto não encontrado');
    }
    return projeto;
  }
  @Get(':id/reduced')
  @UseGuards(JwtAuthGuard)
  async getOneReduced(@Param('id') projetoId: string) {
    const projeto = await this.prisma.projetoPrisma.findUnique({
      where: {
        id: projetoId,
      },
    });
    if (!projeto) {
      throw new NotFoundException('Projeto não encontrado');
    }
    return projeto;
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() { nome, descricao }: ProjetoPrisma) {
    if (!nome || nome.length < 3) {
      throw new BadRequestException(
        'Nome do projeto deve ter no mínimo 3 caracteres, sem caracteres especiais',
      );
    }
    await this.prisma.projetoPrisma.create({
      data: { nome, descricao },
    });
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async udpate(
    @Body() { nome, descricao }: ProjetoPrisma,
    @Param('id') projetoId: string,
  ) {
    if (!nome || nome.length < 3) {
      throw new BadRequestException(
        'Nome do projeto deve ter no mínimo 3 caracteres, sem caracteres especiais',
      );
    }
    await this.prisma.projetoPrisma.update({
      data: { nome, descricao },
      where: {
        id: projetoId,
      },
    });
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') projetoId: string) {
    const projetoExists = await this.prisma.projetoPrisma.findUnique({
      where: {
        id: projetoId,
      },
    });
    if (!projetoExists) {
      throw new NotFoundException('Projeto não encontrado');
    }
    await this.prisma.projetoPrisma.delete({
      where: {
        id: projetoId,
      },
    });
  }
}
