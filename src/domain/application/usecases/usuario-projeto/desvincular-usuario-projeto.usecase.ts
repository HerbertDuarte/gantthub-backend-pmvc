import { Injectable, ForbiddenException } from '@nestjs/common';
import { UseCase } from '@/src/core/interfaces/usecase.interface';
import { UsuarioProjetoPrismaRepository } from '@/src/infrastructure/repository/usuario-projeto-prisma.repository';
import { RemoveUsuarioProjetoDto } from '../../dto/usuario-projeto/remove-usuario-projeto.dto';
import { ProjetoPrismaRepository } from '@/src/infrastructure/repository/projeto-prisma.repository';

@Injectable()
export class DesvincularUsuarioProjetoUseCase implements UseCase<void> {
  constructor(
    private readonly usuarioProjetoRepository: UsuarioProjetoPrismaRepository,
    private readonly projetoRepository: ProjetoPrismaRepository,
  ) {}

  async execute(dados: RemoveUsuarioProjetoDto): Promise<void> {
    // Verificar se o usuário é o criador do projeto
    const creatorId = await this.projetoRepository.findCreatorId(
      dados.projetoId,
    );

    if (creatorId === dados.usuarioId) {
      throw new ForbiddenException(
        'Não é possível remover o vínculo do criador do projeto',
      );
    }

    return this.usuarioProjetoRepository.desvincular(
      dados.usuarioId,
      dados.projetoId,
    );
  }
}
