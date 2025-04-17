import { Injectable } from '@nestjs/common';
import { UseCase } from '@/src/core/interfaces/usecase.interface';
import { MarcoPrisma } from '@prisma/client';
import { CriaMarcoDto } from '../../dto/marco/cria-marco.dto';
import { MarcoPrismaRepository } from '@/src/infrastructure/repository/marco-prisma.repository';
import { MarcoPrismaBuilder } from '@/src/infrastructure/builder/marco-prisma.builder';

@Injectable()
export class CriarMarcoUseCase implements UseCase<MarcoPrisma> {
  constructor(private readonly repository: MarcoPrismaRepository) {}

  async execute(data: CriaMarcoDto): Promise<MarcoPrisma> {
    const marco = MarcoPrismaBuilder.build(data);
    return this.repository.create(marco);
  }
}
