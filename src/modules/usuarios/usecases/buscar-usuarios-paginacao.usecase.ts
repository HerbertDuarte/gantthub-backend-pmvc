import { Injectable } from '@nestjs/common';
import { UsuarioRepository } from '../repository/usuario.repository';
import { UseCase } from 'src/core/interfaces/usecase.interface';
import { PaginateResponse } from 'lib-test-herbert';
import { PaginateUsuarioDto } from '../dto/paginate-usuario.dto';
import { UsuarioEntity } from '../entity/usuario.entity';

@Injectable()
export class BuscarUsuariosPaginacaoUseCase implements UseCase<UsuarioEntity> {
  constructor(private readonly usuarioRepository: UsuarioRepository) {}

  async execute(
    queryPrams: PaginateUsuarioDto,
  ): Promise<PaginateResponse<UsuarioEntity>> {
    return this.usuarioRepository.buscaTodos(queryPrams);
  }
}
