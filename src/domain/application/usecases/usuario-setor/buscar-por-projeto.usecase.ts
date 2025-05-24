import { Injectable } from '@nestjs/common';
import { UseCase } from '@/src/core/interfaces/usecase.interface';
import { UsuarioSetorPrismaRepository } from '@/src/infrastructure/repository/usuario-setor-prisma.repository';
import { UsuarioSetorPrisma } from '@prisma/client';

@Injectable()
export class BuscarPorProjetoUsuarioSetorUseCase
  implements UseCase<UsuarioSetorPrisma[]>
{
  constructor(
    private readonly usuarioSetorRepository: UsuarioSetorPrismaRepository,
  ) {}

  async execute(projetoId: string): Promise<UsuarioSetorPrisma[]> {
    return this.usuarioSetorRepository.buscarPorProjeto(projetoId);
  }
}
