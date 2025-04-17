import { Injectable } from '@nestjs/common';
import { UseCase } from '@/src/core/interfaces/usecase.interface';
import { SetorPrisma } from '@prisma/client';
import { SetorPrismaRepository } from '@/src/infrastructure/repository/setor-prisma.repository';

@Injectable()
export class ListarSetoresUseCase implements UseCase<SetorPrisma[]> {
  constructor(private readonly repository: SetorPrismaRepository) {}

  async execute(): Promise<SetorPrisma[]> {
    return this.repository.findAll();
  }
}
