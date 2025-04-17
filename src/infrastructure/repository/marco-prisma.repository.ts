import { PrismaService } from '@/src/infrastructure/plugins/database/services/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { MarcoPrisma } from '@prisma/client';

@Injectable()
export class MarcoPrismaRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(marco: MarcoPrisma): Promise<MarcoPrisma> {
    return this.prismaService.marcoPrisma.create({ data: marco });
  }

  async findById(id: string): Promise<MarcoPrisma> {
    const marco = await this.prismaService.marcoPrisma.findUnique({
      where: { id },
    });

    if (!marco) {
      throw new NotFoundException('Marco não encontrado');
    }

    return marco;
  }

  async update(id: string, data: Partial<MarcoPrisma>): Promise<MarcoPrisma> {
    await this.findById(id);

    return this.prismaService.marcoPrisma.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<void> {
    await this.findById(id);

    await this.prismaService.marcoPrisma.delete({
      where: { id },
    });
  }
}
