import { Injectable } from '@nestjs/common';
import { UseCase } from '@/src/core/interfaces/usecase.interface';
import { MarcoPrisma } from '@prisma/client';
import { MarcoPrismaRepository } from '@/src/infrastructure/repository/marco-prisma.repository';
import { AtualizaMarcoDto } from '../../dto/marco/atualiza-marco.dto';

@Injectable()
export class AtualizarMarcoUseCase implements UseCase<MarcoPrisma> {
  constructor(private readonly repository: MarcoPrismaRepository) {}

  async execute(id: string, data: AtualizaMarcoDto): Promise<MarcoPrisma> {
    return this.repository.update(id, data);
  }
}
