import { PaginateResponse } from 'lib-test-herbert';
import { PaginateUsuarioDto } from '../application/dto/usuario/paginate-usuario.dto';
import { Usuario } from '../entity/usuario';

export interface IUsuarioRepository {
  cria(data: Usuario): Promise<Usuario>;
  buscaTodos(props: PaginateUsuarioDto): Promise<PaginateResponse<Usuario>>;
  buscaPorEmail(email: string): Promise<Usuario>;
  buscaPorLogin(login: string): Promise<Usuario>;
  buscaPorSenha(senha: string): Promise<Usuario>;
  buscaPorId(id: string): Promise<Usuario>;
  atualiza(id: string, data: Usuario): Promise<Usuario>;
  deleta(id: string): Promise<Usuario>;
}
