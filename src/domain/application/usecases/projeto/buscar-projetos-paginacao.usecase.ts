import { Injectable } from '@nestjs/common';
import { UseCase } from '@/src/core/interfaces/usecase.interface';
import { PaginateResponse } from 'lib-test-herbert';
import { ProjetoPrisma } from '@prisma/client';
import { PaginateProjetoDto } from '../../dto/projeto/paginate-projeto.dto';
import { ProjetoPrismaRepository } from '@/src/infrastructure/repository/projeto-prisma.repository';

@Injectable()
export class BuscarProjetosPaginacaoUseCase
  implements UseCase<PaginateResponse<ProjetoPrisma>>
{
  constructor(private readonly projetoRepository: ProjetoPrismaRepository) {}

  async execute(
    props: PaginateProjetoDto,
    usuarioId?: string,
  ): Promise<PaginateResponse<ProjetoPrisma>> {
    return this.projetoRepository.findAll(props, usuarioId);
  }
}
