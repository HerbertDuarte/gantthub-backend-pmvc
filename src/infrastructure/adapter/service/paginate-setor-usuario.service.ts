import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/src/infrastructure/plugins/database/services/prisma.service';
import { PaginateSetorUsuarioDto } from '@/src/domain/application/dto/usuario-setor/paginate-setor-usuario.dto';
import { PaginateResponse } from 'lib-test-herbert';
import { SetorPrisma } from '@prisma/client';

@Injectable()
export class PaginateSetorUsuarioService {
  constructor(private readonly prismaService: PrismaService) {}

  async paginate(
    usuarioId: string,
    props: PaginateSetorUsuarioDto,
  ): Promise<PaginateResponse<SetorPrisma>> {
    const { busca, pagina, itensPorPagina } = props;

    const usuarioExists = await this.prismaService.usuarioPrisma.findUnique({
      where: { id: usuarioId },
    });

    if (!usuarioExists) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const setoresDoUsuario =
      await this.prismaService.usuarioSetorPrisma.findMany({
        where: { usuarioId },
        select: { setorId: true },
      });

    const idsSetoresDoUsuario = setoresDoUsuario.map((us) => us.setorId);

    const whereClause: any = {};

    if (busca) {
      whereClause.OR = [
        { nome: { contains: busca, mode: 'insensitive' } },
        { cor: { contains: busca, mode: 'insensitive' } },
      ];
    }

    const total = await this.prismaService.setorPrisma.count({
      where: whereClause,
    });

    const setoresDoUsuario_ = await this.prismaService.setorPrisma.findMany({
      where: {
        ...whereClause,
        setorId: { in: idsSetoresDoUsuario },
      },
      orderBy: { nome: 'asc' },
      take:
        idsSetoresDoUsuario.length > itensPorPagina
          ? itensPorPagina
          : undefined,
    });

    if (setoresDoUsuario_.length >= itensPorPagina) {
      return {
        data: setoresDoUsuario_,
        maxPag: Math.ceil(total / itensPorPagina),
      };
    }

    const setoresForaDoUsuario = await this.prismaService.setorPrisma.findMany({
      where: {
        ...whereClause,
        setorId: { notIn: idsSetoresDoUsuario },
      },
      orderBy: { nome: 'asc' },
      skip:
        pagina > 1
          ? (pagina - 1) * itensPorPagina - setoresDoUsuario_.length
          : 0,
      take: itensPorPagina - setoresDoUsuario_.length,
    });

    const resultado = [...setoresDoUsuario_, ...setoresForaDoUsuario];

    return {
      data: resultado,
      maxPag: Math.ceil(total / itensPorPagina),
    };
  }
}
