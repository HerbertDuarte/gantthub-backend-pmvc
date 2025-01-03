import { PaginateResponse } from 'lib-test-herbert';

import { PaginateUsuarioDto } from '../application/dto/usuario/paginate-usuario.dto';
import { Usuario } from '../entity/usuario';

export interface IUsuarioRepository {
  cria(data: Usuario): Promise<Usuario>;
  findAll(props: PaginateUsuarioDto): Promise<PaginateResponse<Usuario>>;
  findByEmail(email: string): Promise<Usuario>;
  findByRefreshToken(refreshToken: string): Promise<Usuario>;
  updateRefreshToken(usuarioId: string): Promise<Usuario>;
  findByLogin(login: string): Promise<Usuario>;
  findBySenha(senha: string): Promise<Usuario>;
  findById(id: string): Promise<Usuario>;
  atualiza(id: string, data: Usuario): Promise<Usuario>;
  deleta(id: string): Promise<Usuario>;
}
