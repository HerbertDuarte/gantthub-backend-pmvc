import { Injectable } from '@nestjs/common';
import { CriaUsuarioDto } from '../../dto/usuario/cria-usuario.dto';
import { UsuarioPrismaRepository } from '../../../../infrastructure/repository/usuario-prisma.repository';
import { HashUtils } from 'lib-test-herbert';
import { EmailJaCadastradoValidator } from '../../validators/email-ja-cadastrado.validator';
import { LoginJaCadastradoValidator } from '../../validators/login-ja-cadastrado.validator';
import { UseCase } from 'src/core/interfaces/usecase.interface';
import { Usuario } from '../../../entity/usuario';

@Injectable()
export class CriarUsuarioUseCase implements UseCase<Usuario> {
  constructor(
    private readonly usuarioRepository: UsuarioPrismaRepository,
    private readonly emailJaCadastradoValidator: EmailJaCadastradoValidator,
    private readonly loginJaCadastradoValidator: LoginJaCadastradoValidator,
  ) {}

  async execute(data: CriaUsuarioDto): Promise<Usuario> {
    await this.loginJaCadastradoValidator.validate(data.login);
    await this.emailJaCadastradoValidator.validate(data.email);

    const usuario = new Usuario({
      email: data.email,
      login: data.login,
      nome: data.nome,
      senha: data.senha,
    });
    return this.usuarioRepository.cria(usuario);
  }
}
