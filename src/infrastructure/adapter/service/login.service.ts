import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { randomUUID } from 'crypto';
import { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';

import { LoginResponseDto } from '../../../domain/application/dto/auth/login-response.dto';
import { Environment } from '../../env/environment';

@Injectable()
export class LoginService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly config: ConfigService<Environment, true>,
  ) {}

  async execute(
    request: Request,
    response?: Response,
  ): Promise<LoginResponseDto> {
    const usuario = request.user;
    const payload = {
      email: usuario.email,
      id: usuario.id,
      refreshToken: randomUUID(),
    };
    const usuarioId = usuario.id;
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: this.config.get('JWT_EXPIRE'),
      algorithm: 'HS256',
      privateKey: this.config.get('JWT_SECRET'),
    });
    const bearerToken = `Bearer ${accessToken}`;
    response && response.setHeader('Authorization', bearerToken);

    return {
      access_token: accessToken,
      usuarioId,
    };
  }
}
