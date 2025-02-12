import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuarioPrismaRepository } from '@/src/infrastructure/repository/usuario-prisma.repository';

import { AuthUsuarioValidator } from '../../../domain/application/validators/auth-usuario.validator';
import { UsuarioPrisma } from '@prisma/client';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(
    private readonly authUsuarioValidator: AuthUsuarioValidator,
    private readonly usuarioRepository: UsuarioPrismaRepository,
  ) {
    super({
      usernameField: 'username',
    });
  }

  async validate(username: string, senha: string): Promise<UsuarioPrisma> {
    const usuario = await this.authUsuarioValidator.validate({
      username,
      senha,
    });
    if (!usuario) {
      throw new UnauthorizedException('Usuário ou senha inválidos!');
    }

    const usuarioLogado = await this.usuarioRepository.updateRefreshToken(
      usuario.id,
    );
    return usuarioLogado;
  }
}
