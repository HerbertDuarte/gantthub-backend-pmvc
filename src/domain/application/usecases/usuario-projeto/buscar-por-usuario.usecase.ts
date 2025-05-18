import { Injectable } from '@nestjs/common';
import { UseCase } from '@/src/core/interfaces/usecase.interface';
import { UsuarioProjetoPrisma } from '@prisma/client';
import { UsuarioProjetoPrismaRepository } from '@/src/infrastructure/repository/usuario-projeto-prisma.repository';

@Injectable()
export class BuscarPorUsuarioUsuarioProjetoUseCase
  implements UseCase<UsuarioProjetoPrisma[]>
{
  constructor(private readonly repository: UsuarioProjetoPrismaRepository) {}

  async execute(usuarioId: string): Promise<UsuarioProjetoPrisma[]> {
    return this.repository.findByUsuario(usuarioId);
  }
}
