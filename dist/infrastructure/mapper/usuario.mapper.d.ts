import { UsuarioPrisma } from '@prisma/client';
import { Usuario } from '../../domain/entity/usuario';
export declare class UsuarioMapper {
    static toDomain(usuarioPrisma: UsuarioPrisma): Usuario;
    static toPersistence(entity: Usuario): UsuarioPrisma;
}
