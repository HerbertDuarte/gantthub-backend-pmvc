import { EnumSituacaoUsuario } from '../../../enum/usuario-situacao.enum';
export declare class AtualizaPerfilUsuarioDto {
    nome?: string;
    email?: string;
    situacao?: EnumSituacaoUsuario;
    login?: string;
    senhaNova?: string;
    senhaAntiga?: string;
}
