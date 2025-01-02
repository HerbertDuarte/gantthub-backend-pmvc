import { EnumSituacaoUsuario } from '../../../enum/usuario-situacao.enum';
export declare class CriaUsuarioDto {
    nome: string;
    email: string;
    situacao: EnumSituacaoUsuario;
    login: string;
    senha: string;
}
