import { Injectable } from '@nestjs/common';
import { PrismaService } from '../plugins/database/services/prisma.service';

@Injectable()
export class ProjetoPrismaRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public async getAll() {
    return this.prismaService.projetoPrisma.findMany({});
  }

  public getOne() {
    return this.prismaService.projetoPrisma.findFirst({
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
    });
  }
}
