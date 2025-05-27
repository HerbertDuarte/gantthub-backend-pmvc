import { PrismaService } from '@/src/infrastructure/plugins/database/services/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { SetorPrisma } from '@prisma/client';
import { PaginateResponse, PaginateUtil } from 'lib-test-herbert';
import { PaginateSetorDto } from '@/src/domain/application/dto/setor/paginate-setor.dto';

@Injectable()
export class SetorPrismaRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: SetorPrisma): Promise<SetorPrisma> {
    return this.prismaService.setorPrisma.create({
      data,
    });
  }

  async findById(id: string): Promise<SetorPrisma | null> {
    const setor = await this.prismaService.setorPrisma.findUnique({
      where: { setorId: id },
    });

    if (!setor) {
      throw new NotFoundException('Setor não encontrado');
    }

    return setor;
  }

  async findAll(
    props?: PaginateSetorDto,
  ): Promise<PaginateResponse<SetorPrisma>> {
    const { busca, pagina, itensPorPagina } = props;
    const paginateUtil = new PaginateUtil<SetorPrisma>(this.prismaService);

    return paginateUtil.execute({
      module: 'setorPrisma',
      busca,
      pagina,
      itensPorPagina,
      include: {
        usuarioSetor: {
          include: { usuario: true },
        },
      },
    });
  }

  async findAllWithoutPagination(userId?: string) {
    return this.prismaService.setorPrisma.findMany({
      include: {
        usuarioSetor: {
          include: { usuario: true },
        },
      },
    });
  }

  async update(id: string, data: Partial<SetorPrisma>): Promise<SetorPrisma> {
    const setor = await this.findById(id);

    if (!setor) {
      throw new NotFoundException('Setor não encontrado');
    }

    return this.prismaService.setorPrisma.update({
      where: { setorId: id },
      data,
    });
  }

  async delete(id: string): Promise<void> {
    const setor = await this.findById(id);

    if (!setor) {
      throw new NotFoundException('Setor não encontrado');
    }

    await this.prismaService.setorPrisma.delete({
      where: { setorId: id },
    });
  }
}
