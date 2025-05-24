import { Injectable } from '@nestjs/common';
import { UseCase } from '@/src/core/interfaces/usecase.interface';
import { PaginateResponse } from 'lib-test-herbert';
import { SetorPrisma } from '@prisma/client';
import { PaginateSetorProjetoDto } from '../../dto/projeto-setor/paginate-setor-projeto.dto';
import { PaginateSetorProjetoService } from '@/src/infrastructure/adapter/service/paginate-setor-projeto.service';

@Injectable()
export class BuscarSetoresProjetoPaginacaoUseCase
  implements UseCase<PaginateResponse<SetorPrisma>>
{
  constructor(
    private readonly paginateSetorProjetoService: PaginateSetorProjetoService,
  ) {}

  async execute(
    projetoId: string,
    props: PaginateSetorProjetoDto,
  ): Promise<PaginateResponse<SetorPrisma>> {
    return this.paginateSetorProjetoService.paginate(projetoId, props);
  }
}
