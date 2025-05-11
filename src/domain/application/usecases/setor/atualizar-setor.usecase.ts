import { Injectable, NotFoundException } from '@nestjs/common';
import { SetorPrismaRepository } from '@/src/infrastructure/repository/setor-prisma.repository';
import { AtualizaSetorDto } from '../../dto/setor/atualiza-setor.dto';

@Injectable()
export class AtualizarSetorUseCase {
  constructor(private readonly repository: SetorPrismaRepository) {}

  async execute(id: string, data: AtualizaSetorDto): Promise<void> {
    const setorExists = await this.repository.findById(id);
    if (!setorExists) {
      throw new NotFoundException('Setor não encontrado');
    }

    return this.repository.update(id, data);
  }
}
