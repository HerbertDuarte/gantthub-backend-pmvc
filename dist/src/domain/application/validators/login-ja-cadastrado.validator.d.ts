import { UsuarioPrismaRepository } from '../../../infrastructure/repository/usuario-prisma.repository';
import { Validator } from 'src/core/interfaces/validator.interface';
export declare class LoginJaCadastradoValidator implements Validator<string, void> {
    private usuarioRepository;
    private readonly logger;
    constructor(usuarioRepository: UsuarioPrismaRepository);
    validate(login: string): Promise<void>;
}
