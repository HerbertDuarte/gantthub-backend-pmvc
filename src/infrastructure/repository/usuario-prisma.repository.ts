import { PrismaService } from '@/src/infrastructure/plugins/database/services/prisma.service';
import { Injectable } from '@nestjs/common';
import { PaginateResponse, PaginateUtil } from 'lib-test-herbert';
import { randomUUID } from 'crypto';
import { PaginateUsuarioDto } from '../../domain/application/dto/usuario/paginate-usuario.dto';
import { UsuarioPrisma } from '@prisma/client';

@Injectable()
export class UsuarioPrismaRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async cria(usuario: UsuarioPrisma): Promise<UsuarioPrisma> {
    return this.prismaService.usuarioPrisma.create({ data: usuario });
  }
  async findAll(
    props: PaginateUsuarioDto,
  ): Promise<PaginateResponse<UsuarioPrisma>> {
    const { busca, pagina, itensPorPagina, situacao } = props;
    const paginateUtil = new PaginateUtil<UsuarioPrisma>(this.prismaService);

    return paginateUtil.execute({
      module: 'usuarioPrisma',
      busca,
      pagina,
      itensPorPagina,
      queries: { situacao },
    });
  }

  async findByEmail(email: string): Promise<UsuarioPrisma> {
    return this.prismaService.usuarioPrisma.findUnique({
      where: {
        email,
      },
    });
  }
  async findById(id: string): Promise<UsuarioPrisma> {
    const usuario = await this.prismaService.usuarioPrisma.findUnique({
      where: {
        id,
      },
    });
    if (!usuario) return null;
    return usuario;
  }
  async findByLogin(login: string): Promise<UsuarioPrisma> {
    const usuario = await this.prismaService.usuarioPrisma.findUnique({
      where: {
        login,
      },
    });
    if (!usuario) return null;
    return usuario;
  }

  async findByRefreshToken(refreshToken: string): Promise<UsuarioPrisma> {
    const usuario = await this.prismaService.usuarioPrisma.findFirst({
      where: {
        refreshToken,
      },
    });
    if (!usuario) return null;
    return usuario;
  }

  async updateRefreshToken(usuarioId: string): Promise<UsuarioPrisma> {
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

    if (!usuarioPrisma) return null;
    return usuarioPrisma;
  }

  async atualiza(id: string, entity: UsuarioPrisma): Promise<UsuarioPrisma> {
    const usuarioExists = await this.findById(id);
    if (!usuarioExists) {
      throw new Error('Usuário não existe');
    }
    return this.prismaService.usuarioPrisma.update({
      where: {
        id,
      },
      data: entity,
    });
  }

  async deleta(id: string): Promise<void | any> {
    await this.prismaService.usuarioPrisma.delete({
      where: {
        id,
      },
    });
  }
}
