import { UseCase } from '@/src/core/interfaces/usecase.interface';
import { CriaUsuarioDto } from '../../dto/usuario/cria-usuario.dto';
import { UsuarioPrismaRepository } from '../../../../infrastructure/repository/usuario-prisma.repository';
import { EmailJaCadastradoValidator } from '../../validators/email-ja-cadastrado.validator';
import { LoginJaCadastradoValidator } from '../../validators/login-ja-cadastrado.validator';
import { Usuario } from '../../../entity/usuario';
export declare class CriarUsuarioUseCase implements UseCase<Usuario> {
    private readonly usuarioRepository;
    private readonly emailJaCadastradoValidator;
    private readonly loginJaCadastradoValidator;
    constructor(usuarioRepository: UsuarioPrismaRepository, emailJaCadastradoValidator: EmailJaCadastradoValidator, loginJaCadastradoValidator: LoginJaCadastradoValidator);
    execute(data: CriaUsuarioDto): Promise<Usuario>;
}
