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

  public getOne() {
    return this.prismaService.projetoPrisma.findFirst(this.insertions);
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
    },
  };
}
