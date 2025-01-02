import { Strategy } from 'passport-local';
import { AuthUsuarioValidator } from '../../../domain/application/validators/auth-usuario.validator';
import { Usuario } from 'src/domain/entity/usuario';
import { UsuarioPrismaRepository } from 'src/infrastructure/repository/usuario-prisma.repository';
declare const LocalStrategy_base: new (...args: any[]) => Strategy;
export declare class LocalStrategy extends LocalStrategy_base {
    private readonly authUsuarioValidator;
    private readonly usuarioRepository;
    constructor(authUsuarioValidator: AuthUsuarioValidator, usuarioRepository: UsuarioPrismaRepository);
    validate(email: string, senha: string): Promise<Usuario>;
}
export {};
