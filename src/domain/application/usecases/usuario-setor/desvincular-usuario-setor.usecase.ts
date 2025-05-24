import { Injectable } from '@nestjs/common';
import { UseCase } from '@/src/core/interfaces/usecase.interface';
import { UsuarioSetorPrismaRepository } from '@/src/infrastructure/repository/usuario-setor-prisma.repository';
import { RemoveUsuarioSetorDto } from '@/src/domain/application/dto/usuario-setor/remove-usuario-setor.dto';

@Injectable()
export class DesvincularUsuarioSetorUseCase implements UseCase<void> {
  constructor(
    private readonly usuarioSetorRepository: UsuarioSetorPrismaRepository,
  ) {}

  async execute(dados: RemoveUsuarioSetorDto): Promise<void> {
    return this.usuarioSetorRepository.desvincular(dados);
  }
}
