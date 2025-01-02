"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioMapper = void 0;
const usuario_1 = require("../../domain/entity/usuario");
class UsuarioMapper {
    static toDomain(usuarioPrisma) {
        if (!usuarioPrisma) {
            return null;
        }
        return new usuario_1.Usuario({
            id: usuarioPrisma.id,
            nome: usuarioPrisma.nome,
            email: usuarioPrisma.email,
            situacao: usuarioPrisma.situacao,
            login: usuarioPrisma.login,
            senha: usuarioPrisma.senha,
            createdAt: usuarioPrisma.createdAt,
            imageUrl: usuarioPrisma.imageUrl,
        });
    }
    static toPersistence(entity) {
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
            imageUrl: entity.getImageUrl(),
        };
    }
}
exports.UsuarioMapper = UsuarioMapper;
//# sourceMappingURL=usuario.mapper.js.map