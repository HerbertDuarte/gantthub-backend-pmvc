import { UsuarioDecodedDto } from 'src/modules/auth/dto/usuario-decoded.dto';

declare module 'express' {
  export interface Request {
    user: UsuarioDecodedDto;
  }

  export interface Response {
    user: UsuarioDecodedDto;
  }
}
