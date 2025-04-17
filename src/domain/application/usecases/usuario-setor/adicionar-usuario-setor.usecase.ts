import { Injectable } from '@nestjs/common';
import { UseCase } from '@/src/core/interfaces/usecase.interface';
import { AdicionaRemoveUsuarioSetorDto } from '../../dto/usuario-setor/adiciona-remove-usuario-setor.dto';
import { SetorPrismaRepository } from '@/src/infrastructure/repository/setor-prisma.repository';

@Injectable()
export class AdicionarUsuarioSetorUseCase implements UseCase<void> {
  constructor(private readonly setorRepository: SetorPrismaRepository) {}

  async execute(dados: AdicionaRemoveUsuarioSetorDto): Promise<void> {
    return this.setorRepository.adicionarUsuario(
      dados.setorId,
      dados.usuarioId,
    );
  }
}
