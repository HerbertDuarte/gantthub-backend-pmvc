import { Injectable } from '@nestjs/common';
import { UseCase } from '@/src/core/interfaces/usecase.interface';
import { MarcoPrismaRepository } from '@/src/infrastructure/repository/marco-prisma.repository';

@Injectable()
export class DeletarMarcoUseCase implements UseCase<void> {
  constructor(private readonly repository: MarcoPrismaRepository) {}

  async execute(id: string): Promise<void> {
    return this.repository.delete(id);
  }
}
