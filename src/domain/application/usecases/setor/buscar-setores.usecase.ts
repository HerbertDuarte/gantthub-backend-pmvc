import { Injectable } from '@nestjs/common';
import { UseCase } from '@/src/core/interfaces/usecase.interface';
import { SetorPrisma } from '@prisma/client';
import { SetorPrismaRepository } from '@/src/infrastructure/repository/setor-prisma.repository';

@Injectable()
export class BuscarSetoresUseCase implements UseCase<SetorPrisma[]> {
  constructor(private readonly setorRepository: SetorPrismaRepository) {}

  async execute(userId?: string): Promise<SetorPrisma[]> {
    return this.setorRepository.findAllWithoutPagination(userId);
  }
}
