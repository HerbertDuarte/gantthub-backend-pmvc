import { Injectable } from '@nestjs/common';
import { UseCase } from '@/src/core/interfaces/usecase.interface';
import { ProjetoSetorPrisma } from '@prisma/client';
import { PrismaService } from '@/src/infrastructure/plugins/database/services/prisma.service';

@Injectable()
export class BuscarPorSetorProjetoSetorUseCase
  implements UseCase<ProjetoSetorPrisma[]>
{
  constructor(private readonly prismaService: PrismaService) {}

  async execute(setorId: string): Promise<ProjetoSetorPrisma[]> {
    return this.prismaService.projetoSetorPrisma.findMany({
      where: { setorId },
      include: {
        projeto: true,
      },
    });
  }
}
