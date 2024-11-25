import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UseCase } from 'src/core/interfaces/usecase.interface';
import { LoginResponseDto } from '../dto/login-response.dto';
import { UsuarioDecodedDto } from '../dto/usuario-decoded.dto';

@Injectable()
export class LoginUseCase implements UseCase<LoginResponseDto> {
  constructor(private readonly jwtService: JwtService) {}

  async execute(usuario: UsuarioDecodedDto): Promise<LoginResponseDto> {
    const payload = {
      login: usuario.login,
      sub: usuario.id,
    };
    const usuarioId = usuario.id;

    return {
      access_token: this.jwtService.sign(payload),
      usuarioId,
    };
  }
}
