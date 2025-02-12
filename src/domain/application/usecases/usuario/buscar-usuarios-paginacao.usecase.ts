import { Injectable } from '@nestjs/common';
import { PaginateResponse } from 'lib-test-herbert';
import { UseCase } from '@/src/core/interfaces/usecase.interface';
import { UsuarioPrismaRepository } from '@/src/infrastructure/repository/usuario-prisma.repository';

import { PaginateUsuarioDto } from '../../dto/usuario/paginate-usuario.dto';
import { UsuarioPrisma } from '@prisma/client';

@Injectable()
export class BuscarUsuariosPaginacaoUseCase implements UseCase<UsuarioPrisma> {
  constructor(private readonly usuarioRepository: UsuarioPrismaRepository) {}

  async execute(
    queryPrams: PaginateUsuarioDto,
  ): Promise<PaginateResponse<UsuarioPrisma>> {
    return this.usuarioRepository.findAll(queryPrams);
  }
}
