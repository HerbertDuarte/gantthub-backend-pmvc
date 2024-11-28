import { PaginateUsuarioDto } from '../../domain/application/dto/usuario/paginate-usuario.dto';
import { IUsuarioRepository } from '../../domain/repository/usuario.respository';
import { PrismaService } from 'src/infrastructure/plugins/database/services/prisma.service';
import { Injectable } from '@nestjs/common';
import { PaginateResponse, PaginateUtil } from 'lib-test-herbert';
import { UsuarioEntity } from '../../domain/entity/usuario.entity';
import { UsuarioMapper } from '../mapper/usuario.mapper';

@Injectable()
export class UsuarioTypeOrmRepository implements IUsuarioRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async cria(usuario: UsuarioEntity): Promise<UsuarioEntity> {
    await this.prismaService.usuario.create({
      data: UsuarioMapper.toPersistence(usuario),
    });

    return usuario;
  }
  async buscaTodos(
    props: PaginateUsuarioDto,
  ): Promise<PaginateResponse<UsuarioEntity>> {
    const { busca, pagina, itensPorPagina } = props;
    const paginateUtil = new PaginateUtil<UsuarioEntity>(this.prismaService);

    return paginateUtil.execute({
      module: 'usuario',
      busca,
      pagina,
      itensPorPagina,
    });
  }

  async buscaPorEmail(email: string): Promise<UsuarioEntity> {
    const usuario = await this.prismaService.usuario.findUnique({
      where: {
        email,
      },
    });
    return UsuarioMapper.toDomain(usuario);
  }
  async buscaPorId(id: string): Promise<UsuarioEntity> {
    const usuario = await this.prismaService.usuario.findUnique({
      where: {
        id,
      },
    });

    return UsuarioMapper.toDomain(usuario);
  }
  async buscaPorLogin(login: string): Promise<UsuarioEntity> {
    const usuario = await this.prismaService.usuario.findUnique({
      where: {
        login: login,
      },
    });

    return UsuarioMapper.toDomain(usuario);
  }

  async buscaPorSenha(senha: string): Promise<UsuarioEntity> {
    const usuario = await this.prismaService.usuario.findFirst({
      where: {
        senha,
      },
    });

    return UsuarioMapper.toDomain(usuario);
  }
  async atualiza(id: string, entity: UsuarioEntity): Promise<UsuarioEntity> {
    const usuario = await this.prismaService.usuario.update({
      where: {
        id,
      },
      data: UsuarioMapper.toPersistence(entity),
    });

    return UsuarioMapper.toDomain(usuario);
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
