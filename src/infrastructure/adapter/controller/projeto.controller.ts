import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Query,
} from '@nestjs/common';
import { PrismaService } from '../../plugins/database/services/prisma.service';
import { ProjetoPrisma } from '@prisma/client';
import { PaginateResponse, PaginateUtil } from 'lib-test-herbert';
import { PaginateProjetoDto } from '@/src/domain/application/dto/projeto/paginate-projeto.dto';

@Controller('projeto')
export class ProjetoController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
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
    });
  }

  @Get(':id')
  async findOne(@Param('id') projetoId: string) {
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
}
