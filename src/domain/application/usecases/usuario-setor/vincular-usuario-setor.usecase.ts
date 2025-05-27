import { Injectable } from '@nestjs/common';
import { UseCase } from '@/src/core/interfaces/usecase.interface';
import { UsuarioSetorPrismaRepository } from '@/src/infrastructure/repository/usuario-setor-prisma.repository';
import { CriaUsuarioSetorDto } from '@/src/domain/application/dto/usuario-setor/cria-usuario-setor.dto';
import { UsuarioSetorPrisma } from '@prisma/client';

@Injectable()
export class VincularUsuarioSetorUseCase
  implements UseCase<UsuarioSetorPrisma>
{
  constructor(
    private readonly usuarioSetorRepository: UsuarioSetorPrismaRepository,
  ) {}

  async execute(dados: CriaUsuarioSetorDto): Promise<UsuarioSetorPrisma> {
    return this.usuarioSetorRepository.vincular({
      usuarioId: dados.usuarioId,
      setorId: dados.setorId,
    });
  }
}
