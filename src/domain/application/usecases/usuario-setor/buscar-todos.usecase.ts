import { Injectable } from '@nestjs/common';
import { UseCase } from '@/src/core/interfaces/usecase.interface';
import { UsuarioSetorPrismaRepository } from '@/src/infrastructure/repository/usuario-setor-prisma.repository';
import { UsuarioSetorPrisma } from '@prisma/client';

@Injectable()
export class BuscarTodosUsuarioSetorUseCase
  implements UseCase<UsuarioSetorPrisma[]>
{
  constructor(
    private readonly usuarioSetorRepository: UsuarioSetorPrismaRepository,
  ) {}

  async execute(): Promise<UsuarioSetorPrisma[]> {
    return await this.usuarioSetorRepository.buscarTodos();
  }
}
