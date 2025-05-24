import { Injectable } from '@nestjs/common';
import { UseCase } from '@/src/core/interfaces/usecase.interface';
import { PaginateUsuarioProjetoSetorService } from '@/src/infrastructure/adapter/service/paginate-usuario-projeto-setor.service';
import { PaginateUsuarioProjetoDto } from '@/src/domain/application/dto/usuario-setor/paginate-usuario-projeto.dto';
import { PaginateResponse } from 'lib-test-herbert';
import { UsuarioPrisma } from '@prisma/client';

@Injectable()
export class BuscarUsuariosProjetoPaginacaoUseCase
  implements UseCase<UsuarioPrisma>
{
  constructor(
    private readonly paginateUsuarioProjetoSetorService: PaginateUsuarioProjetoSetorService,
  ) {}

  async execute(
    projetoId: string,
    props: PaginateUsuarioProjetoDto,
  ): Promise<PaginateResponse<UsuarioPrisma>> {
    return this.paginateUsuarioProjetoSetorService.paginate(projetoId, props);
  }
}
