import { Injectable } from '@nestjs/common';
import { PrismaService } from '../plugins/database/services/prisma.service';

@Injectable()
export class ProjetoPrismaRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public async getAll() {
    return this.prismaService.projetoPrisma.findMany({
      include: {
        usuariosProjetos: {
          include: {
            usuario: true,
          },
        },
      },
    });
  }

  public getOne(id: string) {
    return this.prismaService.projetoPrisma.findUnique({
      ...this.insertions,
      where: {
        id,
      },
    });
  }

  private readonly insertions = {
    include: {
      marcos: {
        include: {
          tarefas: {
            include: {
              usuariosTarefas: {
                include: {
                  usuario: true,
                },
              },
              checkLists: {
                include: {
                  checkItems: true,
                },
              },
            },
          },
        },
      },
      usuariosProjetos: {
        include: {
          usuario: true,
        },
      },
    },
  };
}
