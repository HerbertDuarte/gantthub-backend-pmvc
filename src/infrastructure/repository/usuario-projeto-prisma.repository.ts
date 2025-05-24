import { PrismaService } from '@/src/infrastructure/plugins/database/services/prisma.service';
import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { UsuarioProjetoPrisma } from '@prisma/client';

@Injectable()
export class UsuarioProjetoPrismaRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async vincular(dados: {
    usuarioId: string;
    projetoId: string;
    createdAt: Date;
  }): Promise<UsuarioProjetoPrisma> {
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
      await this.prismaService.usuarioProjetoPrisma.findUnique({
        where: {
          projetoId_usuarioId: {
            projetoId: dados.projetoId,
            usuarioId: dados.usuarioId,
          },
        },
      });

    if (vinculoExists) {
      throw new ConflictException('Usuário já vinculado ao projeto');
    }

    return this.prismaService.usuarioProjetoPrisma.create({
      data: dados,
    });
  }

  async desvincular(usuarioId: string, projetoId: string): Promise<void> {
    const vinculoExists =
      await this.prismaService.usuarioProjetoPrisma.findUnique({
        where: {
          projetoId_usuarioId: {
            projetoId,
            usuarioId,
          },
        },
      });

    if (!vinculoExists) {
      throw new NotFoundException(
        'Vínculo entre usuário e projeto não encontrado',
      );
    }

    const projeto = await this.prismaService.projetoPrisma.findUnique({
      where: { id: projetoId },
      select: { createdById: true },
    });

    if (!projeto) {
      throw new NotFoundException('Projeto não encontrado');
    }

    if (projeto.createdById === usuarioId) {
      throw new ConflictException(
        'Não é possível remover o vínculo do criador do projeto',
      );
    }

    await this.prismaService.usuarioProjetoPrisma.delete({
      where: {
        projetoId_usuarioId: {
          projetoId,
          usuarioId,
        },
      },
    });
  }

  async findByUsuario(usuarioId: string): Promise<UsuarioProjetoPrisma[]> {
    return this.prismaService.usuarioProjetoPrisma.findMany({
      where: { usuarioId },
      include: { projeto: true },
    });
  }

  async findByProjeto(projetoId: string): Promise<UsuarioProjetoPrisma[]> {
    return this.prismaService.usuarioProjetoPrisma.findMany({
      where: { projetoId },
      include: { usuario: true },
    });
  }
}
