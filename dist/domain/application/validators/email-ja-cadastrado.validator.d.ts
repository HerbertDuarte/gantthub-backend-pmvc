import { Validator } from '@/src/core/interfaces/validator.interface';
import { UsuarioPrismaRepository } from '../../../infrastructure/repository/usuario-prisma.repository';
export declare class EmailJaCadastradoValidator implements Validator<string, void> {
    private usuarioRepository;
    private readonly logger;
    constructor(usuarioRepository: UsuarioPrismaRepository);
    validate(email: string): Promise<void>;
}
