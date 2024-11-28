import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { AtualizaUsuarioDto } from '../dto/usuario/atualiza-usuario.dto';
import { EmailJaCadastradoValidator } from './email-ja-cadastrado.validator';
import { LoginJaCadastradoValidator } from './login-ja-cadastrado.validator';
import { Usuario } from '../../entity/usuario';

@Injectable()
export class UpdateUsuarioValidator {
  private readonly logger = new Logger(UpdateUsuarioValidator.name);
  constructor(
    private readonly emailJaCadastradoValidator: EmailJaCadastradoValidator,
    private readonly loginJaCadastradoValidator: LoginJaCadastradoValidator,
  ) {}

  async validate(usuario: Usuario, data: AtualizaUsuarioDto) {
    if (!usuario) {
      this.logger.error('Usuario não existe.');
      throw new NotFoundException('Usuario não existe');
    }

    if (usuario.getEmail() !== data.email) {
      await this.emailJaCadastradoValidator.validate(data.email);
    }

    if (usuario.getLogin() !== data.login) {
      await this.loginJaCadastradoValidator.validate(data.login);
    }
  }
}
