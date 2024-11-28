import { Injectable } from '@nestjs/common';
import { PaginateResponse } from 'lib-test-herbert';
import { UseCase } from 'src/core/interfaces/usecase.interface';
import { Usuario } from 'src/domain/entity/usuario';
import { UsuarioTypeOrmRepository } from 'src/infrastructure/repository/usuario-typeorm.repository';
import { PaginateUsuarioDto } from '../../dto/usuario/paginate-usuario.dto';

@Injectable()
export class BuscarUsuariosPaginacaoUseCase implements UseCase<Usuario> {
  constructor(private readonly usuarioRepository: UsuarioTypeOrmRepository) {}

  async execute(
    queryPrams: PaginateUsuarioDto,
  ): Promise<PaginateResponse<Usuario>> {
    return this.usuarioRepository.buscaTodos(queryPrams);
  }
}
