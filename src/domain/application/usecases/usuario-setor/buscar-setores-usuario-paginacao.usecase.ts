import { Injectable } from '@nestjs/common';
import { UseCase } from '@/src/core/interfaces/usecase.interface';
import { PaginateResponse } from 'lib-test-herbert';
import { SetorPrisma } from '@prisma/client';
import { PaginateSetorUsuarioDto } from '../../dto/usuario-setor/paginate-setor-usuario.dto';
import { PaginateSetorUsuarioService } from '@/src/infrastructure/adapter/service/paginate-setor-usuario.service';

@Injectable()
export class BuscarSetoresUsuarioPaginacaoUseCase
  implements UseCase<PaginateResponse<SetorPrisma>>
{
  constructor(
    private readonly paginateSetorUsuarioService: PaginateSetorUsuarioService,
  ) {}

  async execute(
    usuarioId: string,
    props: PaginateSetorUsuarioDto,
  ): Promise<PaginateResponse<SetorPrisma>> {
    return this.paginateSetorUsuarioService.paginate(usuarioId, props);
  }
}
