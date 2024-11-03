import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthUsuarioValidator } from '../../validators/auth-usuario.validator';
import { Usuario } from '@prisma/client';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authUsuarioValidator: AuthUsuarioValidator) {
    super();
  }

  async validate(login: string, senha: string): Promise<Usuario> {
    const usuario = await this.authUsuarioValidator.validate({ login, senha });
    if (!usuario) {
      throw new UnauthorizedException('Usuário ou senha inválidos!');
    }
    return usuario;
  }
}
