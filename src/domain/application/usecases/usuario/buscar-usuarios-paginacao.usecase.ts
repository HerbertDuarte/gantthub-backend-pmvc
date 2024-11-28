import { Injectable } from '@nestjs/common';
import { PaginateResponse } from 'lib-test-herbert';
import { UseCase } from 'src/core/interfaces/usecase.interface';
import { UsuarioEntity } from 'src/domain/entity/usuario.entity';
import { UsuarioTypeOrmRepository } from 'src/infrastructure/repository/usuario-typeorm.repository';
import { PaginateUsuarioDto } from '../../dto/usuario/paginate-usuario.dto';

@Injectable()
export class BuscarUsuariosPaginacaoUseCase implements UseCase<UsuarioEntity> {
  constructor(private readonly usuarioRepository: UsuarioTypeOrmRepository) {}

  async execute(
    queryPrams: PaginateUsuarioDto,
  ): Promise<PaginateResponse<UsuarioEntity>> {
    return this.usuarioRepository.buscaTodos(queryPrams);
  }
}
