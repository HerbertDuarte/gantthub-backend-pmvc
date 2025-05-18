import { Injectable, ForbiddenException } from '@nestjs/common';
import { UseCase } from '@/src/core/interfaces/usecase.interface';
import { ProjetoPrismaRepository } from '@/src/infrastructure/repository/projeto-prisma.repository';

@Injectable()
export class DeletarProjetoUseCase implements UseCase<void> {
  constructor(private readonly projetoRepository: ProjetoPrismaRepository) {}

  async execute(id: string, usuarioId?: string): Promise<void> {
    // Se o usuarioId for fornecido, verifica se o usuário tem relação com o projeto
    if (usuarioId) {
      const temRelacao =
        await this.projetoRepository.isUsuarioRelacionadoAoProjeto(
          id,
          usuarioId,
        );

      if (!temRelacao) {
        throw new ForbiddenException(
          'Você não tem permissão para excluir este projeto',
        );
      }

      // Podemos ser mais restritivos e permitir apenas que o criador exclua o projeto
      const creatorId = await this.projetoRepository.findCreatorId(id);
      if (creatorId !== usuarioId) {
        throw new ForbiddenException(
          'Apenas o criador do projeto pode excluí-lo',
        );
      }
    }

    await this.projetoRepository.delete(id);
  }
}
