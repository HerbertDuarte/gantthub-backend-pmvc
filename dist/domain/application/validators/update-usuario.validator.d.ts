import { AtualizaUsuarioDto } from '../dto/usuario/atualiza-usuario.dto';
import { EmailJaCadastradoValidator } from './email-ja-cadastrado.validator';
import { LoginJaCadastradoValidator } from './login-ja-cadastrado.validator';
import { Usuario } from '../../entity/usuario';
export declare class UpdateUsuarioValidator {
    private readonly emailJaCadastradoValidator;
    private readonly loginJaCadastradoValidator;
    private readonly logger;
    constructor(emailJaCadastradoValidator: EmailJaCadastradoValidator, loginJaCadastradoValidator: LoginJaCadastradoValidator);
    validate(usuario: Usuario, data: AtualizaUsuarioDto): Promise<void>;
}
