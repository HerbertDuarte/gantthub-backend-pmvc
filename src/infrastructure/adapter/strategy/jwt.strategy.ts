import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsuarioJWTPayload } from '../../../domain/application/dto/auth/usuario-jwt-payload.dto';
import { UsuarioPrismaRepository } from 'src/infrastructure/repository/usuario-prisma.repository';
import { Usuario } from 'src/domain/entity/usuario';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  private logger = new Logger(JwtStrategy.name);
  constructor(
    configService: ConfigService,
    private readonly usuarioRepository: UsuarioPrismaRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: UsuarioJWTPayload): Promise<Usuario> {
    if (this.verificaExpiracao(payload)) {
      const usuario = await this.usuarioRepository.findByRefreshToken(
        payload.refreshToken,
      );
      if (!usuario) {
        this.logger.error('Usuário não encontrado');
        throw new UnauthorizedException('Acesso negado');
      }

      return this.usuarioRepository.updateRefreshToken(usuario.getId());
    }

    const usuario = await this.usuarioRepository.findById(payload.id);
    if (!usuario) {
      throw new UnauthorizedException('Usuário não encontrado');
    }
    return usuario;
  }

  private verificaExpiracao(payload: UsuarioJWTPayload) {
    const dataAtual = new Date().getTime();
    const dataExpiracao = new Date(payload.exp * 1000).getTime();
    return dataAtual > dataExpiracao;
  }
}
