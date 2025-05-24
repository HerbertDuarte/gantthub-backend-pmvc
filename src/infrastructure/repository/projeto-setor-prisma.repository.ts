import { PrismaService } from '@/src/infrastructure/plugins/database/services/prisma.service';
import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { ProjetoSetorPrisma } from '@prisma/client';

@Injectable()
export class ProjetoSetorPrismaRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async vincular(dados: {
    projetoId: string;
    setorId: string;
  }): Promise<ProjetoSetorPrisma> {
    const projetoExists = await this.prismaService.projetoPrisma.findUnique({
      where: { id: dados.projetoId },
    });

    if (!projetoExists) {
      throw new NotFoundException('Projeto não encontrado');
    }

    const setorExists = await this.prismaService.setorPrisma.findUnique({
      where: { setorId: dados.setorId },
    });

    if (!setorExists) {
      throw new NotFoundException('Setor não encontrado');
    }

    const vinculoExists =
      await this.prismaService.projetoSetorPrisma.findUnique({
        where: {
          setorId_projetoId: {
            setorId: dados.setorId,
            projetoId: dados.projetoId,
          },
        },
      });

    if (vinculoExists) {
      throw new ConflictException('Setor já vinculado ao projeto');
    }

    return this.prismaService.projetoSetorPrisma.create({
      data: dados,
      include: {
        setor: true,
        projeto: true,
      },
    });
  }

  async desvincular(dados: {
    projetoId: string;
    setorId: string;
  }): Promise<void> {
    const vinculo = await this.prismaService.projetoSetorPrisma.findUnique({
      where: {
        setorId_projetoId: {
          setorId: dados.setorId,
          projetoId: dados.projetoId,
        },
      },
    });

    if (!vinculo) {
      throw new NotFoundException(
        'Vínculo entre projeto e setor não encontrado',
      );
    }

    await this.prismaService.projetoSetorPrisma.delete({
      where: {
        setorId_projetoId: {
          setorId: dados.setorId,
          projetoId: dados.projetoId,
        },
      },
    });
  }

  async buscarPorProjeto(projetoId: string): Promise<ProjetoSetorPrisma[]> {
    const projetoExists = await this.prismaService.projetoPrisma.findUnique({
      where: { id: projetoId },
    });

    if (!projetoExists) {
      throw new NotFoundException('Projeto não encontrado');
    }

    return this.prismaService.projetoSetorPrisma.findMany({
      where: { projetoId },
      include: {
        setor: true,
        projeto: true,
      },
    });
  }

  async buscarPorSetor(setorId: string): Promise<ProjetoSetorPrisma[]> {
    const setorExists = await this.prismaService.setorPrisma.findUnique({
      where: { setorId },
    });

    if (!setorExists) {
      throw new NotFoundException('Setor não encontrado');
    }

    return this.prismaService.projetoSetorPrisma.findMany({
      where: { setorId },
      include: {
        setor: true,
        projeto: true,
      },
    });
  }

  async buscarTodos(): Promise<ProjetoSetorPrisma[]> {
    return this.prismaService.projetoSetorPrisma.findMany({
      include: {
        setor: true,
        projeto: true,
      },
    });
  }
}
