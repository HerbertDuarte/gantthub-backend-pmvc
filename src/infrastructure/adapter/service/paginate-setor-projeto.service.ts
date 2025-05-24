import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/src/infrastructure/plugins/database/services/prisma.service';
import { PaginateSetorProjetoDto } from '@/src/domain/application/dto/projeto-setor/paginate-setor-projeto.dto';
import { PaginateResponse } from 'lib-test-herbert';
import { SetorPrisma } from '@prisma/client';

@Injectable()
export class PaginateSetorProjetoService {
  constructor(private readonly prismaService: PrismaService) {}

  async paginate(
    projetoId: string,
    props: PaginateSetorProjetoDto,
  ): Promise<PaginateResponse<SetorPrisma>> {
    const { busca, pagina, itensPorPagina } = props;

    const projetoExists = await this.prismaService.projetoPrisma.findUnique({
      where: { id: projetoId },
    });

    if (!projetoExists) {
      throw new NotFoundException('Projeto não encontrado');
    }

    const setoresDoProjeto =
      await this.prismaService.projetoSetorPrisma.findMany({
        where: { projetoId },
        select: { setorId: true },
      });

    const idsSetoresDoProjeto = setoresDoProjeto.map((ps) => ps.setorId);

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

    const setoresDoProjeto_ = await this.prismaService.setorPrisma.findMany({
      where: {
        ...whereClause,
        setorId: { in: idsSetoresDoProjeto },
      },
      orderBy: { nome: 'asc' },
      take:
        idsSetoresDoProjeto.length > itensPorPagina
          ? itensPorPagina
          : undefined,
    });

    if (setoresDoProjeto_.length >= itensPorPagina) {
      return {
        data: setoresDoProjeto_,
        maxPag: Math.ceil(total / itensPorPagina),
      };
    }

    const setoresForaDoProjeto = await this.prismaService.setorPrisma.findMany({
      where: {
        ...whereClause,
        setorId: { notIn: idsSetoresDoProjeto },
      },
      orderBy: { nome: 'asc' },
      skip:
        pagina > 1
          ? (pagina - 1) * itensPorPagina - setoresDoProjeto_.length
          : 0,
      take: itensPorPagina - setoresDoProjeto_.length,
    });

    const resultado = [...setoresDoProjeto_, ...setoresForaDoProjeto];

    return {
      data: resultado,
      maxPag: Math.ceil(total / itensPorPagina),
    };
  }
}
