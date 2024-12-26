import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { UsuarioPrismaRepository } from '../../../infrastructure/repository/usuario-prisma.repository';
import { Validator } from 'src/core/interfaces/validator.interface';

@Injectable()
export class LoginJaCadastradoValidator implements Validator<string, void> {
  private readonly logger = new Logger(LoginJaCadastradoValidator.name);
  constructor(private usuarioRepository: UsuarioPrismaRepository) {}

  async validate(login: string): Promise<void> {
    const loginExiste = await this.usuarioRepository.findByLogin(login);
    if (loginExiste) {
      this.logger.error('Esse login já existe na base de dados');
      throw new ConflictException('Esse login já existe na base de dados');
    }
  }
}
