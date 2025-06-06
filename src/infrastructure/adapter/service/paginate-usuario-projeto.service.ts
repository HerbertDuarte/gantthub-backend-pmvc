import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/src/infrastructure/plugins/database/services/prisma.service';
import { PaginateUsuarioProjetoDto } from '@/src/domain/application/dto/usuario/paginate-usuario-projeto.dto';
import { PaginateResponse } from 'lib-test-herbert';
import { UsuarioPrisma } from '@prisma/client';

@Injectable()
export class PaginateUsuarioProjetoService {
  constructor(private readonly prismaService: PrismaService) {}

  async paginate(
    projetoId: string,
    props: PaginateUsuarioProjetoDto,
  ): Promise<PaginateResponse<UsuarioPrisma>> {
    const { busca, pagina, itensPorPagina, situacao } = props;

    const projetoExists = await this.prismaService.projetoPrisma.findUnique({
      where: { id: projetoId },
    });

    if (!projetoExists) {
      throw new NotFoundException('Projeto não encontrado');
    }

    const usuariosDoProjeto =
      await this.prismaService.usuarioProjetoPrisma.findMany({
        where: { projetoId },
        select: { usuarioId: true },
      });

    const idsUsuariosDoProjeto = usuariosDoProjeto.map((up) => up.usuarioId);

    const whereClause: any = {};
    if (situacao !== undefined) {
      whereClause.situacao = situacao;
    }

    if (busca) {
      whereClause.OR = [
        { nome: { contains: busca, mode: 'insensitive' } },
        { email: { contains: busca, mode: 'insensitive' } },
        { login: { contains: busca, mode: 'insensitive' } },
      ];
    }

    const total = await this.prismaService.usuarioPrisma.count({
      where: whereClause,
    });

    const usuariosDoProjeto_ = await this.prismaService.usuarioPrisma.findMany({
      where: {
        ...whereClause,
        id: { in: idsUsuariosDoProjeto },
      },
      orderBy: { nome: 'asc' },
      take:
        idsUsuariosDoProjeto.length > itensPorPagina
          ? itensPorPagina
          : undefined,
    });

    if (usuariosDoProjeto_.length >= itensPorPagina) {
      return {
        data: usuariosDoProjeto_,
        maxPag: Math.ceil(total / itensPorPagina),
      };
    }

    const usuariosForaDoProjeto =
      await this.prismaService.usuarioPrisma.findMany({
        where: {
          ...whereClause,
          id: { notIn: idsUsuariosDoProjeto },
        },
        orderBy: { nome: 'asc' },
        skip:
          pagina > 1
            ? (pagina - 1) * itensPorPagina - usuariosDoProjeto_.length
            : 0,
        take: itensPorPagina - usuariosDoProjeto_.length,
      });

    const resultado = [...usuariosDoProjeto_, ...usuariosForaDoProjeto];

    return {
      data: resultado,
      maxPag: Math.ceil(total / itensPorPagina),
    };
  }
}
