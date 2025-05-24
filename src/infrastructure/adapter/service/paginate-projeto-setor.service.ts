import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/src/infrastructure/plugins/database/services/prisma.service';
import { PaginateProjetoSetorDto } from '@/src/domain/application/dto/projeto-setor/paginate-projeto-setor.dto';
import { PaginateResponse } from 'lib-test-herbert';
import { ProjetoPrisma } from '@prisma/client';

@Injectable()
export class PaginateProjetoSetorService {
  constructor(private readonly prismaService: PrismaService) {}

  async paginate(
    setorId: string,
    props: PaginateProjetoSetorDto,
  ): Promise<PaginateResponse<ProjetoPrisma>> {
    const { busca, pagina, itensPorPagina } = props;

    const setorExists = await this.prismaService.setorPrisma.findUnique({
      where: { setorId },
    });

    if (!setorExists) {
      throw new NotFoundException('Setor não encontrado');
    }

    const projetosDoSetor =
      await this.prismaService.projetoSetorPrisma.findMany({
        where: { setorId },
        select: { projetoId: true },
      });

    const idsProjetosDoSetor = projetosDoSetor.map((ps) => ps.projetoId);

    const whereClause: any = {};

    if (busca) {
      whereClause.OR = [
        { nome: { contains: busca, mode: 'insensitive' } },
        { descricao: { contains: busca, mode: 'insensitive' } },
      ];
    }

    const total = await this.prismaService.projetoPrisma.count({
      where: whereClause,
    });

    const projetosDoSetor_ = await this.prismaService.projetoPrisma.findMany({
      where: {
        ...whereClause,
        id: { in: idsProjetosDoSetor },
      },
      orderBy: { nome: 'asc' },
      include: {
        createdBy: {
          select: {
            id: true,
            nome: true,
            email: true,
          },
        },
      },
      take:
        idsProjetosDoSetor.length > itensPorPagina ? itensPorPagina : undefined,
    });

    if (projetosDoSetor_.length >= itensPorPagina) {
      return {
        data: projetosDoSetor_,
        maxPag: Math.ceil(total / itensPorPagina),
      };
    }

    const projetosForaDoSetor = await this.prismaService.projetoPrisma.findMany(
      {
        where: {
          ...whereClause,
          id: { notIn: idsProjetosDoSetor },
        },
        orderBy: { nome: 'asc' },
        include: {
          createdBy: {
            select: {
              id: true,
              nome: true,
              email: true,
            },
          },
        },
        skip:
          pagina > 1
            ? (pagina - 1) * itensPorPagina - projetosDoSetor_.length
            : 0,
        take: itensPorPagina - projetosDoSetor_.length,
      },
    );

    const resultado = [...projetosDoSetor_, ...projetosForaDoSetor];

    return {
      data: resultado,
      maxPag: Math.ceil(total / itensPorPagina),
    };
  }
}
