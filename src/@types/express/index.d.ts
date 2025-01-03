import { Usuario } from '@/src/domain/entity/usuario';

declare module 'express' {
  export interface Request {
    user: Usuario;
  }

  export interface Response {
    user: Usuario;
  }
}
