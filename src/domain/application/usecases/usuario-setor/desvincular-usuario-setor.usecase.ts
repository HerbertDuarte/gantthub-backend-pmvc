import { Injectable } from '@nestjs/common';
import { UseCase } from '@/src/core/interfaces/usecase.interface';
import { UsuarioSetorPrismaRepository } from '@/src/infrastructure/repository/usuario-setor-prisma.repository';

type DesvincularUsuarioSetorProps = {
  usuarioId: string;
  setorId: string;
};

@Injectable()
export class DesvincularUsuarioSetorUseCase implements UseCase<void> {
  constructor(private readonly repository: UsuarioSetorPrismaRepository) {}

  async execute({
    usuarioId,
    setorId,
  }: DesvincularUsuarioSetorProps): Promise<void> {
    await this.repository.desvincular(usuarioId, setorId);
  }
}
