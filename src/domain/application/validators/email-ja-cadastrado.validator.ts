import { Validator } from '@/src/core/interfaces/validator.interface';
import { ConflictException, Injectable, Logger } from '@nestjs/common';

import { UsuarioPrismaRepository } from '../../../infrastructure/repository/usuario-prisma.repository';

@Injectable()
export class EmailJaCadastradoValidator implements Validator<string, void> {
  private readonly logger = new Logger(EmailJaCadastradoValidator.name);
  constructor(private usuarioRepository: UsuarioPrismaRepository) {}
  async validate(email: string): Promise<void> {
    const emailExiste = await this.usuarioRepository.findByEmail(email);

    if (emailExiste) {
      this.logger.error('Esse e-mail já existe na base de dados');
      throw new ConflictException('Esse e-mail já existe na base de dados');
    }
  }
}
