import { EnumUsuarioNivel } from 'src/modules/usuarios/enum/usuario-nivel.enum';

export interface UsuarioJWTPayload {
  login: string;
  sub: string;
  nivel: EnumUsuarioNivel;
}
