import { Injectable } from '@nestjs/common';
import { UseCase } from '@/src/core/interfaces/usecase.interface';
import { SetorPrisma } from '@prisma/client';
import { CriaSetorDto } from '../../dto/setor/cria-setor.dto';
import { SetorPrismaRepository } from '@/src/infrastructure/repository/setor-prisma.repository';
import { SetorPrismaBuilder } from '@/src/infrastructure/builder/setor-prisma.builder';

@Injectable()
export class CriarSetorUseCase implements UseCase<SetorPrisma> {
  constructor(private readonly setorRepository: SetorPrismaRepository) {}

  async execute(data: CriaSetorDto): Promise<SetorPrisma> {
    const setor = SetorPrismaBuilder.build(data);
    return this.setorRepository.create(setor);
  }
}
