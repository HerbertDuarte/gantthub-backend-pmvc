import { Injectable } from '@nestjs/common';
import { UseCase } from '@/src/core/interfaces/usecase.interface';
import { UsuarioSetorPrisma } from '@prisma/client';
import { UsuarioSetorPrismaRepository } from '@/src/infrastructure/repository/usuario-setor-prisma.repository';

@Injectable()
export class BuscarPorUsuarioUseCase implements UseCase<UsuarioSetorPrisma[]> {
  constructor(private readonly repository: UsuarioSetorPrismaRepository) {}

  async execute(usuarioId: string): Promise<UsuarioSetorPrisma[]> {
    return this.repository.findByUsuario(usuarioId);
  }
}
