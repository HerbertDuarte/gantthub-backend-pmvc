import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UseCase } from 'src/core/interfaces/usecase.interface';
import { LoginResponseDto } from '../../../domain/application/dto/auth/login-response.dto';
import { randomUUID } from 'crypto';
import { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { Environment } from 'src/infrastructure/env/environment.dto';

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
      email: usuario.getEmail(),
      id: usuario.getId(),
      refreshToken: randomUUID(),
    };
    const usuarioId = usuario.getId();
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
