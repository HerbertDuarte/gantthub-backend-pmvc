import { Injectable } from '@nestjs/common';
import { UseCase } from '@/src/core/interfaces/usecase.interface';
import { PaginateProjetoUsuarioService } from '@/src/infrastructure/adapter/service/paginate-projeto-usuario.service';
import { PaginateProjetoUsuarioDto } from '@/src/domain/application/dto/usuario-setor/paginate-projeto-usuario.dto';
import { PaginateResponse } from 'lib-test-herbert';
import { ProjetoPrisma } from '@prisma/client';

@Injectable()
export class BuscarProjetosUsuarioPaginacaoUseCase
  implements UseCase<ProjetoPrisma>
{
  constructor(
    private readonly paginateProjetoUsuarioService: PaginateProjetoUsuarioService,
  ) {}

  async execute(
    usuarioId: string,
    props: PaginateProjetoUsuarioDto,
  ): Promise<PaginateResponse<ProjetoPrisma>> {
    return this.paginateProjetoUsuarioService.paginate(usuarioId, props);
  }
}
