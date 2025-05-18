import {
  Injectable,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { UseCase } from '@/src/core/interfaces/usecase.interface';
import { ProjetoPrisma } from '@prisma/client';
import { AtualizaProjetoDto } from '../../dto/projeto/atualiza-projeto.dto';
import { ProjetoPrismaRepository } from '@/src/infrastructure/repository/projeto-prisma.repository';

@Injectable()
export class AtualizarProjetoUseCase implements UseCase<ProjetoPrisma> {
  constructor(private readonly projetoRepository: ProjetoPrismaRepository) {}

  async execute(
    id: string,
    dados: AtualizaProjetoDto,
    usuarioId?: string,
  ): Promise<ProjetoPrisma> {
    if (!dados.nome || dados.nome.length < 3) {
      throw new BadRequestException(
        'Nome do projeto deve ter no mínimo 3 caracteres, sem caracteres especiais',
      );
    }

    // Se o usuarioId for fornecido, verifica se ele tem relação com o projeto
    if (usuarioId) {
      const temRelacao =
        await this.projetoRepository.isUsuarioRelacionadoAoProjeto(
          id,
          usuarioId,
        );

      if (!temRelacao) {
        throw new ForbiddenException(
          'Você não tem permissão para atualizar este projeto',
        );
      }
    }

    return this.projetoRepository.update(id, dados.nome, dados.descricao);
  }
}
