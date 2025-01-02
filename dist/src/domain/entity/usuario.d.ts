import { EnumSituacaoUsuario } from '../enum/usuario-situacao.enum';
type UsuarioProps = {
    id?: string;
    nome: string;
    email: string;
    situacao?: EnumSituacaoUsuario;
    login: string;
    senha: string;
    createdAt?: Date;
    imageUrl?: string;
};
export declare class Usuario {
    private id;
    private nome;
    private email;
    private situacao;
    private login;
    private senha;
    private imageUrl;
    private createdAt;
    constructor(props: UsuarioProps);
    private setSenha;
    private validate;
    private validatePassword;
    private validateEmail;
    private validateLogin;
    getId: () => string;
    getNome: () => string;
    getEmail: () => string;
    getSituacao: () => EnumSituacaoUsuario;
    getLogin: () => string;
    getSenha: () => string;
    getCreatedAt: () => Date;
    getImageUrl: () => string;
}
export {};
