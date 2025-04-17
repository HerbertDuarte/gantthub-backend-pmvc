import { Injectable, NotFoundException } from '@nestjs/common';
import { UseCase } from '@/src/core/interfaces/usecase.interface';
import { SetorPrisma } from '@prisma/client';
import { SetorPrismaRepository } from '@/src/infrastructure/repository/setor-prisma.repository';
import { AtualizaSetorDto } from '../../dto/setor/atualiza-setor.dto';

@Injectable()
export class AtualizarSetorUseCase implements UseCase<SetorPrisma> {
  constructor(private readonly repository: SetorPrismaRepository) {}

  async execute(id: string, data: AtualizaSetorDto): Promise<SetorPrisma> {
    const setorExists = await this.repository.findById(id);
    if (!setorExists) {
      throw new NotFoundException('Setor não encontrado');
    }

    return this.repository.update(id, data);
  }
}
