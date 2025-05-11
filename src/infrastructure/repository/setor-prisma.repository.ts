import { PaginateSetorDto } from '@/src/domain/application/dto/setor/paginate-setor.dto';
import { PrismaService } from '@/src/infrastructure/plugins/database/services/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import {
  ProjetoPrisma,
  ProjetoSetorPrisma,
  SetorPrisma,
  UsuarioPrisma,
  UsuarioSetorPrisma,
} from '@prisma/client';
import { PaginateResponse, PaginateUtil } from 'lib-test-herbert';

export type SetorPrismaExtended = SetorPrisma & {
  subSetores: SetorPrisma[];
  setorPai: SetorPrisma;
  usuariosSetores: UsuarioSetorPrisma & { usuario: UsuarioPrisma };
  projetosSetores: ProjetoSetorPrisma & { projeto: ProjetoPrisma };
};

@Injectable()
export class SetorPrismaRepository {
  constructor(private readonly prismaService: PrismaService) {}

  private async sincronizarUsuariosComSubsetores(setorId: string) {
    const usuariosDoSetor =
      await this.prismaService.usuarioSetorPrisma.findMany({
        where: { setorId },
        select: { usuarioId: true },
      });

    const subsetores = await this.prismaService.setorPrisma.findMany({
      where: { setorPaiId: setorId },
      select: { id: true },
    });

    for (const usuario of usuariosDoSetor) {
      for (const subsetor of subsetores) {
        await this.prismaService.usuarioSetorPrisma.upsert({
          where: {
            usuarioId_setorId: {
              usuarioId: usuario.usuarioId,
              setorId: subsetor.id,
            },
          },
          create: {
            usuarioId: usuario.usuarioId,
            setorId: subsetor.id,
          },
          update: {},
        });
      }
    }
  }

  async create(setor: SetorPrisma): Promise<SetorPrismaExtended> {
    const novoSetor = await this.prismaService.setorPrisma.create({
      data: setor,
      include: {
        setorPai: true,
        subSetores: true,
      },
    });

    if (novoSetor.setorPaiId) {
      await this.sincronizarUsuariosComSubsetores(novoSetor.setorPaiId);
    }

    return novoSetor as unknown as SetorPrismaExtended;
  }

  async findById(id: string): Promise<SetorPrismaExtended> {
    const setor = await this.prismaService.setorPrisma.findUnique({
      where: { id },
      include: {
        setorPai: true,
        subSetores: true,
        usuariosSetores: {
          include: {
            usuario: true,
          },
        },
        projetosSetores: {
          include: {
            projeto: true,
          },
        },
      },
    });

    if (!setor) {
      throw new NotFoundException('Setor não encontrado');
    }

    return setor as unknown as SetorPrismaExtended;
  }

  async findAll({
    itensPorPagina,
    pagina,
    busca,
    setorPaiId,
  }: PaginateSetorDto): Promise<PaginateResponse<SetorPrismaExtended>> {
    const paginateUtil = new PaginateUtil<SetorPrismaExtended>(
      this.prismaService,
    );
    return paginateUtil.execute({
      module: 'setorPrisma',
      busca,
      pagina,
      itensPorPagina,
      include: {
        setorPai: true,
        subSetores: true,
        usuariosSetores: {
          include: {
            usuario: true,
          },
        },
        projetosSetores: {
          include: {
            projeto: true,
          },
        },
      },
      queries: { setorPaiId },
    });
  }

  async update(
    id: string,
    data: Partial<SetorPrisma>,
  ): Promise<SetorPrismaExtended> {
    const setorExistente = await this.findById(id);

    const setorAtualizado = await this.prismaService.setorPrisma.update({
      where: { id },
      data,
      include: {
        setorPai: true,
        subSetores: true,
      },
    });

    if (data.setorPaiId && data.setorPaiId !== setorExistente.setorPaiId) {
      await this.sincronizarUsuariosComSubsetores(data.setorPaiId);
    }

    return setorAtualizado as SetorPrismaExtended;
  }

  async delete(id: string): Promise<void> {
    await this.findById(id);
    await this.prismaService.setorPrisma.delete({
      where: { id },
    });
  }

  async adicionarUsuario(setorId: string, usuarioId: string): Promise<void> {
    await this.prismaService.usuarioSetorPrisma.create({
      data: {
        usuarioId,
        setorId,
      },
    });

    await this.sincronizarUsuariosComSubsetores(setorId);
  }

  async removerUsuario(setorId: string, usuarioId: string): Promise<void> {
    const setor = await this.findById(setorId);
    const subsetoresIds = setor.subSetores.map((s) => s.id);

    await this.prismaService.usuarioSetorPrisma.deleteMany({
      where: {
        usuarioId,
        setorId: {
          in: [setorId, ...subsetoresIds],
        },
      },
    });
  }
}
