import { Injectable } from '@nestjs/common';
import { UseCase } from '@/src/core/interfaces/usecase.interface';
import { UsuarioSetorPrismaRepository } from '@/src/infrastructure/repository/usuario-setor-prisma.repository';
import { CriaUsuarioSetorDto } from '../../dto/usuario-setor/cria-usuario-setor.dto';

@Injectable()
export class VincularUsuarioSetorUseCase implements UseCase<void> {
  constructor(private readonly repository: UsuarioSetorPrismaRepository) {}

  async execute(dados: CriaUsuarioSetorDto): Promise<void> {
    await this.repository.vincular({
      usuarioId: dados.usuarioId,
      setorId: dados.setorId,
      createdAt: new Date(),
    });
  }
}
