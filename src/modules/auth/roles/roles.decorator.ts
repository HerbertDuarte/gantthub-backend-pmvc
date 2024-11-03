import { SetMetadata } from '@nestjs/common';
import { EnumUsuarioNivel } from 'src/modules/usuarios/enum/usuario-nivel.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: EnumUsuarioNivel[]) =>
  SetMetadata(ROLES_KEY, roles);
