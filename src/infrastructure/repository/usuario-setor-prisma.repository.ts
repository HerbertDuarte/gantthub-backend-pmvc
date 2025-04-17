import { PrismaService } from '@/src/infrastructure/plugins/database/services/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UsuarioSetorPrisma } from '@prisma/client';

@Injectable()
export class UsuarioSetorPrismaRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(usuarioSetor: UsuarioSetorPrisma): Promise<UsuarioSetorPrisma> {
    return this.prismaService.usuarioSetorPrisma.create({ data: usuarioSetor });
  }

  async findByIds(
    usuarioId: string,
    setorId: string,
  ): Promise<UsuarioSetorPrisma> {
    const usuarioSetor = await this.prismaService.usuarioSetorPrisma.findUnique(
      {
        where: {
          usuarioId_setorId: {
            usuarioId,
            setorId,
          },
        },
      },
    );

    if (!usuarioSetor) {
      throw new NotFoundException('Vínculo usuário-setor não encontrado');
    }

    return usuarioSetor;
  }

  async findByUsuario(usuarioId: string): Promise<UsuarioSetorPrisma[]> {
    return this.prismaService.usuarioSetorPrisma.findMany({
      where: { usuarioId },
      include: {
        usuario: true,
        setor: true,
      },
    });
  }

  async findBySetor(setorId: string): Promise<UsuarioSetorPrisma[]> {
    return this.prismaService.usuarioSetorPrisma.findMany({
      where: { setorId },
      include: {
        usuario: true,
        setor: true,
      },
    });
  }

  async delete(usuarioId: string, setorId: string): Promise<void> {
    await this.findByIds(usuarioId, setorId);

    await this.prismaService.usuarioSetorPrisma.delete({
      where: {
        usuarioId_setorId: {
          usuarioId,
          setorId,
        },
      },
    });
  }

  async vincular(dados: UsuarioSetorPrisma): Promise<void> {
    await this.prismaService.usuarioSetorPrisma.create({
      data: dados,
    });
  }

  async desvincular(usuarioId: string, setorId: string): Promise<void> {
    await this.prismaService.usuarioSetorPrisma.delete({
      where: {
        usuarioId_setorId: {
          usuarioId,
          setorId,
        },
      },
    });
  }
}
