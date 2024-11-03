import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsuarioDecodedDto } from '../../dto/usuario-decoded.dto';
import { UsuarioJWTPayload } from '../../dto/usuario-jwt-payload.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: UsuarioJWTPayload): Promise<UsuarioDecodedDto> {
    return { id: payload.sub, login: payload.login, nivel: payload.nivel };
  }
}
