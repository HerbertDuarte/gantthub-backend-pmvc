import { Injectable } from '@nestjs/common';
import { UseCase } from '@/src/core/interfaces/usecase.interface';
import { PaginateResponse } from 'lib-test-herbert';
import { UsuarioPrisma } from '@prisma/client';
import { PaginateUsuarioSetorDto } from '../../dto/usuario-setor/paginate-usuario-setor.dto';
import { PaginateUsuarioSetorService } from '@/src/infrastructure/adapter/service/paginate-usuario-setor.service';

@Injectable()
export class BuscarUsuariosSetorPaginacaoUseCase
  implements UseCase<PaginateResponse<UsuarioPrisma>>
{
  constructor(
    private readonly paginateUsuarioSetorService: PaginateUsuarioSetorService,
  ) {}

  async execute(
    setorId: string,
    props: PaginateUsuarioSetorDto,
  ): Promise<PaginateResponse<UsuarioPrisma>> {
    return this.paginateUsuarioSetorService.paginate(setorId, props);
  }
}
