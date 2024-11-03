import { Usuario } from '@prisma/client';
import { PaginateResponse } from 'lib-test-herbert';
import { CriaUsuarioDto } from '../dto/cria-usuario.dto';
import { PaginateUsuarioDto } from '../dto/paginate-usuario.dto';

export interface IUsuarioRepository {
  cria(data: CriaUsuarioDto): Promise<Usuario>;
  buscaTodos(props: PaginateUsuarioDto): Promise<PaginateResponse<Usuario>>;
  buscaPorEmail(email: string): Promise<Usuario>;
  buscaPorLogin(login: string): Promise<Usuario>;
  buscaPorSenha(senha: string): Promise<Usuario>;
  buscaPorId(id: string): Promise<Usuario>;
  atualiza(id: string, data: Partial<CriaUsuarioDto>): Promise<Usuario>;
  deleta(id: string): Promise<Usuario>;
}
