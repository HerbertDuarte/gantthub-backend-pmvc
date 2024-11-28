import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { UsuarioTypeOrmRepository } from '../../../infrastructure/repository/usuario-typeorm.repository';
import { UseCase } from 'src/core/interfaces/usecase.interface';
import { UsuarioEntity } from '../../entity/usuario.entity';

@Injectable()
export class BuscarPorIdUsuarioUseCase implements UseCase<UsuarioEntity> {
  private readonly logger = new Logger(BuscarPorIdUsuarioUseCase.name);

  constructor(private readonly usuarioRepository: UsuarioTypeOrmRepository) {}

  async execute(id: string): Promise<UsuarioEntity> {
    const usuario = await this.usuarioRepository.buscaPorId(id);

    if (!usuario) {
      this.logger.error('Usuário não encontrado!');
      throw new NotFoundException('Usuário não encontrado!');
    }

    return usuario;
  }
}
