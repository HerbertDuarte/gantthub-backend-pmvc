import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UseCase } from 'src/core/interfaces/usecase.interface';
import { LoginResponseDto } from '../../dto/auth/login-response.dto';
import { randomUUID } from 'crypto';
import { Request } from 'express';

@Injectable()
export class LoginUseCase implements UseCase<LoginResponseDto> {
  constructor(private readonly jwtService: JwtService) {}

  async execute(request: Request): Promise<LoginResponseDto> {
    const usuario = request.user;
    const payload = {
      email: usuario.getEmail(),
      id: usuario.getId(),
      refreshToken: randomUUID(),
    };
    const usuarioId = usuario.getId();
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '1h',
      algorithm: 'HS256',
      privateKey: process.env.JWT_SECRET,
    });

    request.headers.authorization = 'Bearer ' + accessToken;

    return {
      access_token: accessToken,
      usuarioId,
    };
  }
}
