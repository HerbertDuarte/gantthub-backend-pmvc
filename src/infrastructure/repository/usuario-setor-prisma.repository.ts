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
    setorId: string;
  }): Promise<UsuarioSetorPrisma> {
    const usuarioExists = await this.prismaService.usuarioPrisma.findUnique({
      where: { id: dados.usuarioId },
    });

    if (!usuarioExists) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const setorExists = await this.prismaService.setorPrisma.findUnique({
      where: { setorId: dados.setorId },
    });

    if (!setorExists) {
      throw new NotFoundException('Setor não encontrado');
    }

    const vinculoExists = await this.prismaService.usuarioSetorPrisma.findFirst(
      {
        where: {
          usuarioId: dados.usuarioId,
          setorId: dados.setorId,
        },
      },
    );

    if (vinculoExists) {
      throw new ConflictException('Usuário já vinculado ao setor');
    }

    return this.prismaService.usuarioSetorPrisma.create({
      data: dados,
      include: {
        usuario: true,
        setor: true,
      },
    });
  }

  async desvincular(dados: {
    usuarioId: string;
    setorId: string;
  }): Promise<void> {
    const vinculo = await this.prismaService.usuarioSetorPrisma.findFirst({
      where: {
        usuarioId: dados.usuarioId,
        setorId: dados.setorId,
      },
    });

    if (!vinculo) {
      throw new NotFoundException('Vínculo não encontrado');
    }

    await this.prismaService.usuarioSetorPrisma.delete({
      where: {
        usuarioId_setorId: {
          usuarioId: dados.usuarioId,
          setorId: dados.setorId,
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
        setor: true,
      },
    });
  }

  async buscarPorSetor(setorId: string): Promise<UsuarioSetorPrisma[]> {
    const setorExists = await this.prismaService.setorPrisma.findUnique({
      where: { setorId },
    });

    if (!setorExists) {
      throw new NotFoundException('Setor não encontrado');
    }

    return this.prismaService.usuarioSetorPrisma.findMany({
      where: { setorId },
      include: {
        usuario: true,
        setor: true,
      },
    });
  }

  async buscarTodos(): Promise<UsuarioSetorPrisma[]> {
    return this.prismaService.usuarioSetorPrisma.findMany({
      include: {
        usuario: true,
        setor: true,
      },
    });
  }
}
