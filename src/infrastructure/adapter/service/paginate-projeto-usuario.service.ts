import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/src/infrastructure/plugins/database/services/prisma.service';
import { PaginateResponse } from 'lib-test-herbert';
import { ProjetoPrisma } from '@prisma/client';
import { PaginateUsuarioProjetoDto } from '@/src/domain/application/dto/usuario/paginate-usuario-projeto.dto';

@Injectable()
export class PaginateProjetoUsuarioService {
  constructor(private readonly prismaService: PrismaService) {}

  async paginate(
    usuarioId: string,
    props: PaginateUsuarioProjetoDto,
  ): Promise<PaginateResponse<ProjetoPrisma>> {
    const { busca, pagina, itensPorPagina } = props;

    const usuarioExists = await this.prismaService.usuarioPrisma.findUnique({
      where: { id: usuarioId },
    });

    if (!usuarioExists) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const projetosDoUsuario =
      await this.prismaService.usuarioProjetoPrisma.findMany({
        where: { usuarioId },
        select: { projetoId: true },
      });

    const idsProjetosDoUsuario = projetosDoUsuario.map((ps) => ps.projetoId);

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

    const projetosDoUsuario_ = await this.prismaService.projetoPrisma.findMany({
      where: {
        ...whereClause,
        id: { in: idsProjetosDoUsuario },
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
        idsProjetosDoUsuario.length > itensPorPagina
          ? itensPorPagina
          : undefined,
    });

    if (projetosDoUsuario_.length >= itensPorPagina) {
      return {
        data: projetosDoUsuario_,
        maxPag: Math.ceil(total / itensPorPagina),
      };
    }

    const projetosForaDoUsuario =
      await this.prismaService.projetoPrisma.findMany({
        where: {
          ...whereClause,
          id: { notIn: idsProjetosDoUsuario },
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
            ? (pagina - 1) * itensPorPagina - projetosDoUsuario_.length
            : 0,
        take: itensPorPagina - projetosDoUsuario_.length,
      });

    const resultado = [...projetosDoUsuario_, ...projetosForaDoUsuario];

    return {
      data: resultado,
      maxPag: Math.ceil(total / itensPorPagina),
    };
  }
}
