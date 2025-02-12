import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { PrismaService } from '../../plugins/database/services/prisma.service';

@Controller('projeto')
export class ProjetoController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async findAll() {
    return this.prisma.projetoPrisma.findMany();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    console.log(id);

    const projeto = await this.prisma.projetoPrisma.findFirst({
      include: {
        marcos: {
          include: {
            tarefas: {
              include: {
                tarefas: {
                  include: {
                    tarefas: {
                      include: {
                        tarefas: {
                          include: {
                            tarefas: true,
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });
    console.log(projeto);
    if (!projeto) {
      throw new NotFoundException('Projeto não encontrado');
    }
    return projeto;
  }
}
