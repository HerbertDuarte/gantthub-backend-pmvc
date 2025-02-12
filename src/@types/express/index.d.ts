import { UsuarioPrisma } from '@prisma/client';

declare module 'express' {
  export interface Request {
    user: UsuarioPrisma;
  }

  export interface Response {
    user: UsuarioPrisma;
  }
}
