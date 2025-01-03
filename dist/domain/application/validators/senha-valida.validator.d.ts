import { AtualizaPerfilUsuarioDto } from '../dto/usuario/atualiza-perfil.dto';
import { Usuario } from '../../entity/usuario';
export declare class SenhaValidaValidator {
    private readonly logger;
    validate(usuario: Usuario, { senhaAntiga, senhaNova }: AtualizaPerfilUsuarioDto): Promise<void>;
}
