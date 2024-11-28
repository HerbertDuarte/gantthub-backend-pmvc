import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { UsuarioTypeOrmRepository } from '../../../../infrastructure/repository/usuario-typeorm.repository';
import { UseCase } from 'src/core/interfaces/usecase.interface';
import { Usuario } from 'src/domain/entity/usuario';

@Injectable()
export class DeletarUsuarioUseCase implements UseCase<Usuario> {
  private readonly logger = new Logger(DeletarUsuarioUseCase.name);
  constructor(private readonly usuarioRepository: UsuarioTypeOrmRepository) {}

  async execute(id: string): Promise<void> {
    const usuarioExists = await this.usuarioRepository.buscaPorId(id);

    if (!usuarioExists) {
      this.logger.error('usuario não existe!');
      throw new NotFoundException('usuario não existe!');
    }

    await this.usuarioRepository.deleta(id);
  }
}
