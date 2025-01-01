import { Injectable } from '@nestjs/common';
import { PrismaService } from '../plugins/database/services/prisma.service';
import { CreateMarcoDto } from '../adapter/controller/marco.controller';

@Injectable()
export class MarcoPrismaRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public async getAll() {
    return this.prismaService.marcoPrisma.findMany();
  }

  public async create(dto: CreateMarcoDto) {
    return this.prismaService.marcoPrisma.create({
      data: {
        nome: dto.nome,
        projeto: {
          connect: {
            id: dto.projetoId,
          },
        },
      },
    });
  }

  public async update(id: string, dto: Partial<CreateMarcoDto>) {
    const data = {};
    dto.nome && (data['nome'] = dto.nome);

    return this.prismaService.marcoPrisma.update({
      where: {
        id,
      },
      data,
    });
  }
}
