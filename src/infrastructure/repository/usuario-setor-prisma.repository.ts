import { PrismaService } from '@/src/infrastructure/plugins/database/services/prisma.service';
import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { UsuarioSetorPrisma } from '@prisma/client';

@Injectable()
export class UsuarioSetorPrismaRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async vincular(dados: {
    usuarioId: string;
    projetoId: string;
  }): Promise<UsuarioSetorPrisma> {
    const usuarioExists = await this.prismaService.usuarioPrisma.findUnique({
      where: { id: dados.usuarioId },
    });

    if (!usuarioExists) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const projetoExists = await this.prismaService.projetoPrisma.findUnique({
      where: { id: dados.projetoId },
    });

    if (!projetoExists) {
      throw new NotFoundException('Projeto não encontrado');
    }

    const vinculoExists =
      await this.prismaService.usuarioSetorPrisma.findUnique({
        where: {
          usuarioId_projetoId: {
            usuarioId: dados.usuarioId,
            projetoId: dados.projetoId,
          },
        },
      });

    if (vinculoExists) {
      throw new ConflictException('Usuário já vinculado ao projeto');
    }

    return this.prismaService.usuarioSetorPrisma.create({
      data: dados,
      include: {
        usuario: true,
        projeto: true,
      },
    });
  }

  async desvincular(dados: {
    usuarioId: string;
    projetoId: string;
  }): Promise<void> {
    const vinculo = await this.prismaService.usuarioSetorPrisma.findUnique({
      where: {
        usuarioId_projetoId: {
          usuarioId: dados.usuarioId,
          projetoId: dados.projetoId,
        },
      },
    });

    if (!vinculo) {
      throw new NotFoundException('Vínculo não encontrado');
    }

    await this.prismaService.usuarioSetorPrisma.delete({
      where: {
        usuarioId_projetoId: {
          usuarioId: dados.usuarioId,
          projetoId: dados.projetoId,
        },
      },
    });
  }

  async buscarPorUsuario(usuarioId: string): Promise<UsuarioSetorPrisma[]> {
    const usuarioExists = await this.prismaService.usuarioPrisma.findUnique({
      where: { id: usuarioId },
    });

    if (!usuarioExists) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return this.prismaService.usuarioSetorPrisma.findMany({
      where: { usuarioId },
      include: {
        usuario: true,
        projeto: true,
      },
    });
  }

  async buscarPorProjeto(projetoId: string): Promise<UsuarioSetorPrisma[]> {
    const projetoExists = await this.prismaService.projetoPrisma.findUnique({
      where: { id: projetoId },
    });

    if (!projetoExists) {
      throw new NotFoundException('Projeto não encontrado');
    }

    return this.prismaService.usuarioSetorPrisma.findMany({
      where: { projetoId },
      include: {
        usuario: true,
        projeto: true,
      },
    });
  }

  async buscarTodos(): Promise<UsuarioSetorPrisma[]> {
    return this.prismaService.usuarioSetorPrisma.findMany({
      include: {
        usuario: true,
        projeto: true,
      },
    });
  }
}
