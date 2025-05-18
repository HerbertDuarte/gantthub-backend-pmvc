import { Injectable } from '@nestjs/common';
import { UseCase } from '@/src/core/interfaces/usecase.interface';
import { PaginateResponse } from 'lib-test-herbert';
import { UsuarioPrisma } from '@prisma/client';
import { PaginateUsuarioProjetoDto } from '../../dto/usuario/paginate-usuario-projeto.dto';
import { PaginateUsuarioProjetoService } from '@/src/infrastructure/adapter/service/paginate-usuario-projeto.service';

@Injectable()
export class BuscarUsuariosProjetoPaginacaoUseCase
  implements UseCase<PaginateResponse<UsuarioPrisma>>
{
  constructor(
    private readonly paginateUsuarioProjetoService: PaginateUsuarioProjetoService,
  ) {}

  async execute(
    projetoId: string,
    props: PaginateUsuarioProjetoDto,
  ): Promise<PaginateResponse<UsuarioPrisma>> {
    return this.paginateUsuarioProjetoService.paginate(projetoId, props);
  }
}
