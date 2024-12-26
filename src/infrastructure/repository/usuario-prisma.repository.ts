import { PaginateUsuarioDto } from '../../domain/application/dto/usuario/paginate-usuario.dto';
import { IUsuarioRepository } from '../../domain/repository/usuario.respository';
import { PrismaService } from 'src/infrastructure/plugins/database/services/prisma.service';
import { Injectable } from '@nestjs/common';
import { PaginateResponse, PaginateUtil } from 'lib-test-herbert';
import { Usuario } from '../../domain/entity/usuario';
import { UsuarioMapper } from '../mapper/usuario.mapper';
import { randomUUID } from 'crypto';

@Injectable()
export class UsuarioPrismaRepository implements IUsuarioRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async cria(usuario: Usuario): Promise<Usuario> {
    await this.prismaService.usuarioPrisma.create({
      data: UsuarioMapper.toPersistence(usuario),
    });

    return usuario;
  }
  async findAll(props: PaginateUsuarioDto): Promise<PaginateResponse<Usuario>> {
    const { busca, pagina, itensPorPagina } = props;
    const paginateUtil = new PaginateUtil<Usuario>(this.prismaService);

    return paginateUtil.execute({
      module: 'usuarioPrisma',
      busca,
      pagina,
      itensPorPagina,
    });
  }

  async findByEmail(email: string): Promise<Usuario> {
    const usuario = await this.prismaService.usuarioPrisma.findUnique({
      where: {
        email,
      },
    });
    return UsuarioMapper.toDomain(usuario);
  }
  async findById(id: string): Promise<Usuario> {
    const usuario = await this.prismaService.usuarioPrisma.findUnique({
      where: {
        id,
      },
    });

    return UsuarioMapper.toDomain(usuario);
  }
  async findByLogin(login: string): Promise<Usuario> {
    const usuario = await this.prismaService.usuarioPrisma.findUnique({
      where: {
        login: login,
      },
    });

    return UsuarioMapper.toDomain(usuario);
  }

  async findBySenha(senha: string): Promise<Usuario> {
    const usuario = await this.prismaService.usuarioPrisma.findFirst({
      where: {
        senha,
      },
    });

    return UsuarioMapper.toDomain(usuario);
  }

  async findByRefreshToken(refreshToken: string): Promise<Usuario> {
    const usuario = await this.prismaService.usuarioPrisma.findFirst({
      where: {
        refreshToken,
      },
    });

    return UsuarioMapper.toDomain(usuario);
  }

  async updateRefreshToken(usuarioId: string): Promise<Usuario> {
    const usuario = await this.findById(usuarioId);
    if (!usuario) return null;

    const newToken = randomUUID();

    const usuarioPrisma = await this.prismaService.usuarioPrisma.update({
      where: {
        id: usuarioId,
      },
      data: {
        refreshToken: newToken,
      },
    });

    return UsuarioMapper.toDomain(usuarioPrisma);
  }

  async atualiza(id: string, entity: Usuario): Promise<Usuario> {
    const usuario = await this.prismaService.usuarioPrisma.update({
      where: {
        id,
      },
      data: UsuarioMapper.toPersistence(entity),
    });

    return UsuarioMapper.toDomain(usuario);
  }

  async deleta(id: string): Promise<void | any> {
    await this.prismaService.usuarioPrisma.delete({
      where: {
        id,
      },
    });

    return;
  }
}
