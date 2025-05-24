import { Injectable } from '@nestjs/common';
import { UseCase } from '@/src/core/interfaces/usecase.interface';
import { SetorPrismaRepository } from '@/src/infrastructure/repository/setor-prisma.repository';

@Injectable()
export class DeletarSetorUseCase implements UseCase<void> {
  constructor(private readonly setorRepository: SetorPrismaRepository) {}

  async execute(id: string): Promise<void> {
    return this.setorRepository.delete(id);
  }
}
