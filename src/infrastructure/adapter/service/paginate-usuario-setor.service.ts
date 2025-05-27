import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/src/infrastructure/plugins/database/services/prisma.service';
import { PaginateUsuarioSetorDto } from '@/src/domain/application/dto/usuario-setor/paginate-usuario-setor.dto';
import { PaginateResponse } from 'lib-test-herbert';
import { UsuarioPrisma } from '@prisma/client';

@Injectable()
export class PaginateUsuarioSetorService {
  constructor(private readonly prismaService: PrismaService) {}

  async paginate(
    setorId: string,
    props: PaginateUsuarioSetorDto,
  ): Promise<PaginateResponse<UsuarioPrisma>> {
    const { busca, pagina, itensPorPagina } = props;

    const setorExists = await this.prismaService.setorPrisma.findUnique({
      where: { setorId },
    });

    if (!setorExists) {
      throw new NotFoundException('Setor não encontrado');
    }

    const usuariosDoSetor =
      await this.prismaService.usuarioSetorPrisma.findMany({
        where: { setorId },
        select: { usuarioId: true },
      });

    const idsUsuariosDoSetor = usuariosDoSetor.map((us) => us.usuarioId);

    const whereClause: any = {};

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

    const usuariosDoSetor_ = await this.prismaService.usuarioPrisma.findMany({
      where: {
        ...whereClause,
        id: { in: idsUsuariosDoSetor },
      },
      orderBy: { nome: 'asc' },
      take:
        idsUsuariosDoSetor.length > itensPorPagina ? itensPorPagina : undefined,
    });

    if (usuariosDoSetor_.length >= itensPorPagina) {
      return {
        data: usuariosDoSetor_,
        maxPag: Math.ceil(total / itensPorPagina),
      };
    }

    const usuariosForaDoSetor = await this.prismaService.usuarioPrisma.findMany(
      {
        where: {
          ...whereClause,
          id: { notIn: idsUsuariosDoSetor },
        },
        orderBy: { nome: 'asc' },
        skip:
          pagina > 1
            ? (pagina - 1) * itensPorPagina - usuariosDoSetor_.length
            : 0,
        take: itensPorPagina - usuariosDoSetor_.length,
      },
    );

    const resultado = [...usuariosDoSetor_, ...usuariosForaDoSetor];

    return {
      data: resultado,
      maxPag: Math.ceil(total / itensPorPagina),
    };
  }
}
