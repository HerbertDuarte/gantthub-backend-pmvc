import { Injectable } from '@nestjs/common';
import { UseCase } from '@/src/core/interfaces/usecase.interface';
import { SetorPrisma } from '@prisma/client';
import { AtualizaSetorDto } from '../../dto/setor/atualiza-setor.dto';
import { SetorPrismaRepository } from '@/src/infrastructure/repository/setor-prisma.repository';

@Injectable()
export class AtualizarSetorUseCase implements UseCase<SetorPrisma> {
  constructor(private readonly setorRepository: SetorPrismaRepository) {}

  async execute(id: string, data: AtualizaSetorDto): Promise<SetorPrisma> {
    return this.setorRepository.update(id, data);
  }
}
