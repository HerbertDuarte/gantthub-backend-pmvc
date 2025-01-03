import { Logger } from '@nestjs/common';
import { UsuarioPrismaRepository } from '@/src/infrastructure/repository/usuario-prisma.repository';
import { Validator } from '@/src/core/interfaces/validator.interface';
import { Usuario } from '@/src/domain/entity/usuario';
type ValidateUsuarioProps = {
    email: string;
    senha: string;
};
export declare class AuthUsuarioValidator implements Validator<ValidateUsuarioProps, Usuario> {
    private readonly logger;
    private readonly usuarioRepository;
    constructor(logger: Logger, usuarioRepository: UsuarioPrismaRepository);
    validate({ email, senha }: ValidateUsuarioProps): Promise<Usuario>;
}
export {};
