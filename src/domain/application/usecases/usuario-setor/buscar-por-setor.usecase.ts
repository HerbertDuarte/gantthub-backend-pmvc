import { Injectable } from '@nestjs/common';
import { UseCase } from '@/src/core/interfaces/usecase.interface';
import { UsuarioSetorPrisma } from '@prisma/client';
import { UsuarioSetorPrismaRepository } from '@/src/infrastructure/repository/usuario-setor-prisma.repository';

@Injectable()
export class BuscarPorSetorUseCase implements UseCase<UsuarioSetorPrisma[]> {
  constructor(private readonly repository: UsuarioSetorPrismaRepository) {}

  async execute(setorId: string): Promise<UsuarioSetorPrisma[]> {
    return this.repository.findBySetor(setorId);
  }
}
