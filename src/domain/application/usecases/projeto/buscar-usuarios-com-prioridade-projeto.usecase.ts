import { Injectable, ForbiddenException } from '@nestjs/common';
import { UseCase } from '@/src/core/interfaces/usecase.interface';
import { PaginateResponse } from 'lib-test-herbert';
import { UsuarioPrisma } from '@prisma/client';
import { PaginateUsuarioProjetoDto } from '../../dto/usuario/paginate-usuario-projeto.dto';
import { ProjetoPrismaRepository } from '@/src/infrastructure/repository/projeto-prisma.repository';

@Injectable()
export class BuscarUsuariosComPrioridadeProjetoUseCase
  implements UseCase<PaginateResponse<UsuarioPrisma>>
{
  constructor(private readonly projetoRepository: ProjetoPrismaRepository) {}

  async execute(
    projetoId: string,
    props: PaginateUsuarioProjetoDto,
    usuarioId?: string,
  ): Promise<PaginateResponse<UsuarioPrisma>> {
    if (usuarioId) {
      const temRelacao =
        await this.projetoRepository.isUsuarioRelacionadoAoProjeto(
          projetoId,
          usuarioId,
        );

      if (!temRelacao) {
        throw new ForbiddenException(
          'Você não tem permissão para acessar este projeto',
        );
      }
    }

    return this.projetoRepository.findUsuariosComPrioridade(projetoId, props);
  }
}
