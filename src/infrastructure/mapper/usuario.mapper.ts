import { UsuarioPrisma } from '@prisma/client';
import { Usuario } from '../../domain/entity/usuario';
import { EnumSituacaoUsuario } from '../../domain/enum/usuario-situacao.enum';

export class UsuarioMapper {
  static toDomain(usuarioPrisma: UsuarioPrisma): Usuario {
    if (!usuarioPrisma) {
      return null;
    }
    return new Usuario({
      id: usuarioPrisma.id,
      nome: usuarioPrisma.nome,
      email: usuarioPrisma.email,
      situacao: usuarioPrisma.situacao as EnumSituacaoUsuario,
      login: usuarioPrisma.login,
      senha: usuarioPrisma.senha,
      createdAt: usuarioPrisma.createdAt,
    });
  }

  static toPersistence(entity: Usuario): UsuarioPrisma {
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
    } as UsuarioPrisma;
  }
}
