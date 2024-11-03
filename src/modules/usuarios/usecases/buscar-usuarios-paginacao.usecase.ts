import { Injectable } from '@nestjs/common';
import { UsuarioRepository } from '../repository/usuario.repository';
import { Usuario } from '@prisma/client';
import { UseCase } from 'src/core/interfaces/usecase.interface';
import { PaginateResponse } from 'lib-test-herbert';
import { PaginateUsuarioDto } from '../dto/paginate-usuario.dto';

@Injectable()
export class BuscarUsuariosPaginacaoUseCase implements UseCase<Usuario> {
  constructor(private readonly usuarioRepository: UsuarioRepository) {}

  async execute(
    queryPrams: PaginateUsuarioDto,
  ): Promise<PaginateResponse<Usuario>> {
    return this.usuarioRepository.buscaTodos(queryPrams);
  }
}
