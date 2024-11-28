import { UsuarioDecodedDto } from 'src/domain/application/dto/auth/usuario-decoded.dto';

declare module 'express' {
  export interface Request {
    user: UsuarioDecodedDto;
  }

  export interface Response {
    user: UsuarioDecodedDto;
  }
}
