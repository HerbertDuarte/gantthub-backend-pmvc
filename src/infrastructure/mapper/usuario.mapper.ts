import { Usuario } from '@prisma/client';
import { UsuarioEntity } from '../../domain/entity/usuario.entity';
import { EnumSituacaoUsuario } from '../../domain/enum/usuario-situacao.enum';

export class UsuarioMapper {
  static toDomain(usuarioPrisma: Usuario): UsuarioEntity {
    if (!usuarioPrisma) {
      return null;
    }
    return new UsuarioEntity({
      id: usuarioPrisma.id,
      nome: usuarioPrisma.nome,
      email: usuarioPrisma.email,
      situacao: usuarioPrisma.situacao as EnumSituacaoUsuario,
      login: usuarioPrisma.login,
      senha: usuarioPrisma.senha,
      createdAt: usuarioPrisma.createdAt,
      updatedAt: usuarioPrisma.updatedAt,
    });
  }

  static toPersistence(entity: UsuarioEntity): Usuario {
    if (!entity) {
      return null;
    }

    return {
      id: entity.getId(),
      nome: entity.getNome(),
      email: entity.getEmail(),
      situacao: entity.getSituacao(),
      login: entity.getLogin(),
      senha: entity.getSenha(),
      createdAt: entity.getCreatedAt(),
      updatedAt: entity.getUpdatedAt(),
    } as Usuario;
  }
}
