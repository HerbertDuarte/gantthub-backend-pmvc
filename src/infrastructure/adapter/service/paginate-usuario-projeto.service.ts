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

    // Verificar se o projeto existe
    const projetoExists = await this.prismaService.projetoPrisma.findUnique({
      where: { id: projetoId },
    });

    if (!projetoExists) {
      throw new NotFoundException('Projeto não encontrado');
    }

    // Buscar os usuários vinculados ao projeto para definir a prioridade
    const usuariosDoProjeto =
      await this.prismaService.usuarioProjetoPrisma.findMany({
        where: { projetoId },
        select: { usuarioId: true },
      });

    // Obter os IDs dos usuários do projeto
    const idsUsuariosDoProjeto = usuariosDoProjeto.map((up) => up.usuarioId);

    // Base da consulta
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

    // Calcular total de registros (sem considerar paginação)
    const total = await this.prismaService.usuarioPrisma.count({
      where: whereClause,
    });

    // Primeiro buscar os usuários do projeto que atendem aos critérios
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

    // Se já preencheu a página com usuários do projeto, retorna o resultado
    if (usuariosDoProjeto_.length >= itensPorPagina) {
      return {
        data: usuariosDoProjeto_,
        maxPag: Math.ceil(total / itensPorPagina),
      };
    }

    // Se não preencheu, busca os usuários fora do projeto para completar a página
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
