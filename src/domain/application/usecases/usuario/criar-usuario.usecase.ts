import { Injectable } from '@nestjs/common';
import { HashUtils } from 'lib-test-herbert';
import { UseCase } from '@/src/core/interfaces/usecase.interface';

import { CriaUsuarioDto } from '../../dto/usuario/cria-usuario.dto';
import { UsuarioPrismaRepository } from '../../../../infrastructure/repository/usuario-prisma.repository';
import { EmailJaCadastradoValidator } from '../../validators/email-ja-cadastrado.validator';
import { LoginJaCadastradoValidator } from '../../validators/login-ja-cadastrado.validator';
import { UsuarioPrisma } from '@prisma/client';
import { UsuarioPrismaBuilder } from '@/src/infrastructure/builder/usuario-prisma.builder';

@Injectable()
export class CriarUsuarioUseCase implements UseCase<UsuarioPrisma> {
  constructor(
    private readonly usuarioRepository: UsuarioPrismaRepository,
    private readonly emailJaCadastradoValidator: EmailJaCadastradoValidator,
    private readonly loginJaCadastradoValidator: LoginJaCadastradoValidator,
  ) {}

  async execute(data: CriaUsuarioDto): Promise<UsuarioPrisma> {
    await this.loginJaCadastradoValidator.validate(data.login);
    await this.emailJaCadastradoValidator.validate(data.email);

    const usuario = UsuarioPrismaBuilder.build({
      email: data.email,
      login: data.login,
      nome: data.nome,
      senha: data.senha,
    });
    return this.usuarioRepository.cria(usuario);
  }
}
