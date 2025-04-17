import { Injectable } from '@nestjs/common';
import { UseCase } from '@/src/core/interfaces/usecase.interface';
import { MarcoPrisma } from '@prisma/client';
import { MarcoPrismaRepository } from '@/src/infrastructure/repository/marco-prisma.repository';

@Injectable()
export class BuscarPorIdMarcoUseCase implements UseCase<MarcoPrisma> {
  constructor(private readonly repository: MarcoPrismaRepository) {}

  async execute(id: string): Promise<MarcoPrisma> {
    return this.repository.findById(id);
  }
}
