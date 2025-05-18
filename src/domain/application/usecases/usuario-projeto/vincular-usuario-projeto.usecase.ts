import { Injectable } from '@nestjs/common';
import { UseCase } from '@/src/core/interfaces/usecase.interface';
import { UsuarioProjetoPrismaRepository } from '@/src/infrastructure/repository/usuario-projeto-prisma.repository';
import { AdicionaUsuarioProjetoDto } from '../../dto/usuario-projeto/adiciona-usuario-projeto.dto';
import { UsuarioProjetoPrisma } from '@prisma/client';

@Injectable()
export class VincularUsuarioProjetoUseCase
  implements UseCase<UsuarioProjetoPrisma>
{
  constructor(private readonly repository: UsuarioProjetoPrismaRepository) {}

  async execute(
    dados: AdicionaUsuarioProjetoDto,
  ): Promise<UsuarioProjetoPrisma> {
    return this.repository.vincular({
      usuarioId: dados.usuarioId,
      projetoId: dados.projetoId,
      createdAt: new Date(),
    });
  }
}
