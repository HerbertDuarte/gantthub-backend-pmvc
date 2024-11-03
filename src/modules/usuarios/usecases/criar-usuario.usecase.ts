import { Injectable } from '@nestjs/common';
import { CriaUsuarioDto } from '../dto/cria-usuario.dto';
import { UsuarioRepository } from '../repository/usuario.repository';
import { Usuario } from '@prisma/client';
import { HashUtils } from 'lib-test-herbert';
import { EmailJaCadastradoValidator } from '../validators/email-ja-cadastrado.validator';
import { LoginJaCadastradoValidator } from '../validators/login-ja-cadastrado.validator';
import { UseCase } from 'src/core/interfaces/usecase.interface';

@Injectable()
export class CriarUsuarioUseCase implements UseCase<Usuario> {
  constructor(
    private readonly usuarioRepository: UsuarioRepository,
    private readonly emailJaCadastradoValidator: EmailJaCadastradoValidator,
    private readonly loginJaCadastradoValidator: LoginJaCadastradoValidator,
  ) {}

  async execute(data: CriaUsuarioDto): Promise<Usuario> {
    data.senha = await HashUtils.hashString(data.senha);

    await this.loginJaCadastradoValidator.validate(data.login);
    await this.emailJaCadastradoValidator.validate(data.email);

    return this.usuarioRepository.cria(data);
  }
}
