import { Validator } from 'src/core/interfaces/validator.interface';
import { UsuarioPrismaRepository } from '../../../infrastructure/repository/usuario-prisma.repository';
export declare class LoginJaCadastradoValidator implements Validator<string, void> {
    private usuarioRepository;
    private readonly logger;
    constructor(usuarioRepository: UsuarioPrismaRepository);
    validate(login: string): Promise<void>;
}
