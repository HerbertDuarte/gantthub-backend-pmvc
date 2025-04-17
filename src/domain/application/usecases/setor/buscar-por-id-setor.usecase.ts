import { Injectable } from '@nestjs/common';
import { UseCase } from '@/src/core/interfaces/usecase.interface';
import { SetorPrisma } from '@prisma/client';
import { SetorPrismaRepository } from '@/src/infrastructure/repository/setor-prisma.repository';

@Injectable()
export class BuscarPorIdSetorUseCase implements UseCase<SetorPrisma> {
  constructor(private readonly repository: SetorPrismaRepository) {}

  async execute(id: string): Promise<SetorPrisma> {
    return this.repository.findById(id);
  }
}
