import { Injectable } from '@nestjs/common';
import { UseCase } from '@/src/core/interfaces/usecase.interface';
import { UsuarioSetorPrismaRepository } from '@/src/infrastructure/repository/usuario-setor-prisma.repository';
import { UsuarioSetorPrisma } from '@prisma/client';

@Injectable()
export class BuscarPorUsuarioUsuarioSetorUseCase
  implements UseCase<UsuarioSetorPrisma[]>
{
  constructor(
    private readonly usuarioSetorRepository: UsuarioSetorPrismaRepository,
  ) {}

  async execute(usuarioId: string): Promise<UsuarioSetorPrisma[]> {
    return this.usuarioSetorRepository.buscarPorUsuario(usuarioId);
  }
}
