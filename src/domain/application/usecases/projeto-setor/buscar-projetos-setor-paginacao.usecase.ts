import { Injectable } from '@nestjs/common';
import { UseCase } from '@/src/core/interfaces/usecase.interface';
import { PaginateResponse } from 'lib-test-herbert';
import { ProjetoPrisma } from '@prisma/client';
import { PaginateProjetoSetorDto } from '../../dto/projeto-setor/paginate-projeto-setor.dto';
import { PaginateProjetoSetorService } from '@/src/infrastructure/adapter/service/paginate-projeto-setor.service';

@Injectable()
export class BuscarProjetosSetorPaginacaoUseCase
  implements UseCase<PaginateResponse<ProjetoPrisma>>
{
  constructor(
    private readonly paginateProjetoSetorService: PaginateProjetoSetorService,
  ) {}

  async execute(
    setorId: string,
    props: PaginateProjetoSetorDto,
  ): Promise<PaginateResponse<ProjetoPrisma>> {
    return this.paginateProjetoSetorService.paginate(setorId, props);
  }
}
