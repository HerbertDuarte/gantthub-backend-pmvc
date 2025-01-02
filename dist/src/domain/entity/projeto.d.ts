type ProjetoProps = {
    id?: string;
    nome: string;
    descricao: string;
    createdAt?: Date;
};
export declare class Projeto {
    private id;
    private nome;
    private descricao;
    private createdAt;
    constructor(props: ProjetoProps);
    private validate;
    private validateNome;
    private validateDescricao;
    getId: () => string;
    getNome: () => string;
    getDescricao: () => string;
    getCreatedAt: () => Date;
}
export {};
