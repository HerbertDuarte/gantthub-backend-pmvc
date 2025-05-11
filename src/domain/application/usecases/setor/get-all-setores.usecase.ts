import { Injectable } from '@nestjs/common';
import {
  SetorPrismaExtended,
  SetorPrismaRepository,
} from '@/src/infrastructure/repository/setor-prisma.repository';

@Injectable()
export class GetAllSetoresUseCase {
  constructor(private readonly repository: SetorPrismaRepository) {}

  async execute(): Promise<SetorPrismaExtended[]> {
    return this.repository.findAllWithoutPaginate();
  }
}
