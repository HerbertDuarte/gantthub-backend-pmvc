import { Injectable } from '@nestjs/common';
import { PaginateResponse } from 'lib-test-herbert';
import { UseCase } from 'src/core/interfaces/usecase.interface';
import { Usuario } from 'src/domain/entity/usuario';
import { UsuarioPrismaRepository } from 'src/infrastructure/repository/usuario-prisma.repository';
import { PaginateUsuarioDto } from '../../dto/usuario/paginate-usuario.dto';

@Injectable()
export class BuscarUsuariosPaginacaoUseCase implements UseCase<Usuario> {
  constructor(private readonly usuarioRepository: UsuarioPrismaRepository) {}

  async execute(
    queryPrams: PaginateUsuarioDto,
  ): Promise<PaginateResponse<Usuario>> {
    console.log('queryPrams', queryPrams);
    return this.usuarioRepository.findAll(queryPrams);
  }
}
