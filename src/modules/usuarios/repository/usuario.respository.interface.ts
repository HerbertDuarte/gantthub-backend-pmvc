import { PaginateResponse } from 'lib-test-herbert';
import { PaginateUsuarioDto } from '../dto/paginate-usuario.dto';
import { UsuarioEntity } from '../entity/usuario.entity';

export interface IUsuarioRepository {
  cria(data: UsuarioEntity): Promise<UsuarioEntity>;
  buscaTodos(
    props: PaginateUsuarioDto,
  ): Promise<PaginateResponse<UsuarioEntity>>;
  buscaPorEmail(email: string): Promise<UsuarioEntity>;
  buscaPorLogin(login: string): Promise<UsuarioEntity>;
  buscaPorSenha(senha: string): Promise<UsuarioEntity>;
  buscaPorId(id: string): Promise<UsuarioEntity>;
  atualiza(id: string, data: UsuarioEntity): Promise<UsuarioEntity>;
  deleta(id: string): Promise<UsuarioEntity>;
}
