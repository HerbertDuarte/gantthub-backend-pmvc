import { Usuario } from '@prisma/client';
import { CriaUsuarioDto } from '../dto/cria-usuario.dto';
import { PaginateUsuarioDto } from '../dto/paginate-usuario.dto';
import { IUsuarioRepository } from './usuario.respository.interface';
import { PrismaService } from 'src/plugins/database/services/prisma.service';
import { Injectable } from '@nestjs/common';
import { PaginateResponse, PaginateUtil } from 'lib-test-herbert';

@Injectable()
export class UsuarioRepository implements IUsuarioRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async cria(data: CriaUsuarioDto): Promise<Usuario> {
    const usuario = this.prismaService.usuario.create({
      data,
    });

    return usuario;
  }
  async buscaTodos(
    props: PaginateUsuarioDto,
  ): Promise<PaginateResponse<Usuario>> {
    const { busca, pagina, itensPorPagina, nivel } = props;
    const paginateUtil = new PaginateUtil<Usuario>(this.prismaService);

    return paginateUtil.execute({
      module: 'usuario',
      busca,
      pagina,
      itensPorPagina,
      queries: {
        nivel,
      },
    });
  }

  async buscaPorEmail(email: string): Promise<Usuario> {
    const usuario = await this.prismaService.usuario.findUnique({
      where: {
        email,
      },
    });
    return usuario;
  }
  async buscaPorId(id: string): Promise<Usuario> {
    const usuario = await this.prismaService.usuario.findUnique({
      where: {
        id,
      },
    });

    return usuario;
  }
  async buscaPorLogin(login: string): Promise<Usuario> {
    const usuario = await this.prismaService.usuario.findUnique({
      where: {
        login: login,
      },
    });

    return usuario;
  }

  async buscaPorSenha(senha: string): Promise<Usuario> {
    const usuario = await this.prismaService.usuario.findFirst({
      where: {
        senha,
      },
    });

    return usuario;
  }
  async atualiza(
    id: string,
    { email, login, nivel, nome, senha, situacao }: Partial<CriaUsuarioDto>,
  ): Promise<Usuario> {
    return this.prismaService.usuario.update({
      where: {
        id,
      },
      data: { email, login, nivel, nome, senha, situacao },
    });
  }

  async deleta(id: string): Promise<void | any> {
    await this.prismaService.usuario.delete({
      where: {
        id,
      },
    });

    return;
  }
}
