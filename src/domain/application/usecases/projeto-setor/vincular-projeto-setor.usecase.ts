import { Injectable, NotFoundException } from '@nestjs/common';
import { UseCase } from '@/src/core/interfaces/usecase.interface';
import { CriaProjetoSetorDto } from '../../dto/projeto-setor/cria-projeto-setor.dto';
import { SetorPrismaRepository } from '@/src/infrastructure/repository/setor-prisma.repository';
import { PrismaService } from '@/src/infrastructure/plugins/database/services/prisma.service';

@Injectable()
export class VincularProjetoSetorUseCase implements UseCase<void> {
  constructor(
    private readonly setorRepository: SetorPrismaRepository,
    private readonly prismaService: PrismaService,
  ) {}

  async execute(data: CriaProjetoSetorDto): Promise<void> {
    const { projetoId, setorId } = data;

    const projeto = await this.prismaService.projetoPrisma.findUnique({
      where: { id: projetoId },
    });

    if (!projeto) {
      throw new NotFoundException('Projeto não encontrado');
    }

    const setor = await this.prismaService.setorPrisma.findUnique({
      where: { id: setorId },
    });

    if (!setor) {
      throw new NotFoundException('Setor não encontrado');
    }

    const vinculoExistente =
      await this.prismaService.projetoSetorPrisma.findUnique({
        where: {
          projetoId_setorId: {
            projetoId,
            setorId,
          },
        },
      });

    if (!vinculoExistente) {
      await this.setorRepository.adicionarProjeto(setorId, projetoId);
    }
  }
}
