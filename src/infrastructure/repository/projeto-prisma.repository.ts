import { PrismaService } from '@/src/infrastructure/plugins/database/services/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PaginateResponse, PaginateUtil } from 'lib-test-herbert';
import { PaginateProjetoDto } from '../../domain/application/dto/projeto/paginate-projeto.dto';
import { ProjetoPrisma, UsuarioPrisma } from '@prisma/client';
import { PaginateUsuarioProjetoDto } from '../../domain/application/dto/usuario/paginate-usuario-projeto.dto';
import { PaginateUsuarioProjetoService } from '../adapter/service/paginate-usuario-projeto.service';

@Injectable()
export class ProjetoPrismaRepository {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly paginateUsuarioProjetoService: PaginateUsuarioProjetoService,
  ) {}

  async findAll(
    props: PaginateProjetoDto,
    usuarioId?: string,
  ): Promise<PaginateResponse<ProjetoPrisma>> {
    const { busca, pagina, itensPorPagina, setores } = props;

    const paginateUtil = new PaginateUtil<ProjetoPrisma>(this.prismaService);

    const queries: any = {};

    if (usuarioId) {
      queries.OR = [
        { createdById: usuarioId },
        {
          usuariosProjetos: {
            some: {
              usuarioId: usuarioId,
            },
          },
        },
      ];
    }

    if (setores && setores.trim() !== '') {
      const setoresId = setores
        .split(',')
        .map((id) => id.trim())
        .filter((id) => id !== '');
      if (setoresId.length > 0) {
        queries.projetoSetor = {
          some: {
            setorId: {
              in: setoresId,
            },
          },
        };
      }
    }

    return paginateUtil.execute({
      module: 'projetoPrisma',
      busca,
      pagina,
      itensPorPagina,
      queries,
      orderBy: {
        nome: 'asc',
      },
      include: {
        createdBy: true,
        usuariosProjetos: {
          include: { usuario: true },
        },
        projetoSetor: {
          include: { setor: true },
        },
      },
    });
  }

  async findUsuariosComPrioridade(
    projetoId: string,
    props: PaginateUsuarioProjetoDto,
  ): Promise<PaginateResponse<UsuarioPrisma>> {
    return this.paginateUsuarioProjetoService.paginate(projetoId, props);
  }

  async findById(projetoId: string): Promise<ProjetoPrisma> {
    const projeto = await this.prismaService.projetoPrisma.findUnique({
      where: {
        id: projetoId,
      },
      include: {
        marcos: {
          include: {
            tarefas: {
              include: {
                usuario: true,
                subTarefas: {
                  include: { usuario: true },
                },
              },
            },
          },
        },
      },
    });
    if (!projeto) {
      throw new NotFoundException('Projeto não encontrado');
    }
    return projeto;
  }

  async findByIdReduced(projetoId: string): Promise<ProjetoPrisma> {
    const projeto = await this.prismaService.projetoPrisma.findUnique({
      where: {
        id: projetoId,
      },
    });
    if (!projeto) {
      throw new NotFoundException('Projeto não encontrado');
    }
    return projeto;
  }

  async findUsuariosDoProjeto(projetoId: string): Promise<UsuarioPrisma[]> {
    const result = await this.prismaService.projetoPrisma.findUnique({
      where: {
        id: projetoId,
      },
      select: {
        usuariosProjetos: {
          select: {
            usuario: true,
          },
        },
      },
    });
    if (!result) {
      throw new NotFoundException('Projeto não encontrado');
    }
    return result.usuariosProjetos.map((up) => up.usuario);
  }

  async create(
    nome: string,
    descricao: string,
    createdById: string,
  ): Promise<ProjetoPrisma> {
    return this.prismaService.$transaction(async (tx) => {
      const projeto = await tx.projetoPrisma.create({
        data: { nome, descricao, createdById },
      });

      await tx.usuarioProjetoPrisma.create({
        data: {
          projetoId: projeto.id,
          usuarioId: createdById,
          createdAt: new Date(),
        },
      });

      return projeto;
    });
  }

  async update(
    projetoId: string,
    nome: string,
    descricao: string,
  ): Promise<ProjetoPrisma> {
    return this.prismaService.projetoPrisma.update({
      data: { nome, descricao },
      where: {
        id: projetoId,
      },
    });
  }

  async delete(projetoId: string): Promise<void> {
    const projetoExists = await this.prismaService.projetoPrisma.findUnique({
      where: {
        id: projetoId,
      },
    });
    if (!projetoExists) {
      throw new NotFoundException('Projeto não encontrado');
    }
    await this.prismaService.projetoPrisma.delete({
      where: {
        id: projetoId,
      },
    });
  }
  async findCreatorId(projetoId: string): Promise<string> {
    const projeto = await this.prismaService.projetoPrisma.findUnique({
      where: { id: projetoId },
      select: { createdById: true },
    });

    if (!projeto) {
      throw new NotFoundException('Projeto não encontrado');
    }

    return projeto.createdById;
  }

  async isUsuarioRelacionadoAoProjeto(
    projetoId: string,
    usuarioId: string,
  ): Promise<boolean> {
    const projetoExists = await this.prismaService.projetoPrisma.findUnique({
      where: { id: projetoId },
    });

    if (!projetoExists) {
      throw new NotFoundException('Projeto não encontrado');
    }

    if (projetoExists.createdById === usuarioId) {
      return true;
    }

    const vinculo = await this.prismaService.usuarioProjetoPrisma.findUnique({
      where: {
        projetoId_usuarioId: {
          projetoId,
          usuarioId,
        },
      },
    });

    return !!vinculo;
  }
}
