type MarcoProps = {
    id?: string;
    nome: string;
    descricao: string;
    projetoId: string;
    createdAt?: Date;
};
export declare class Marco {
    private id;
    private nome;
    private descricao;
    private projetoId;
    private createdAt;
    constructor(props: MarcoProps);
    private validate;
    private validateNome;
    private validateDescricao;
    getId: () => string;
    getNome: () => string;
    getDescricao: () => string;
    getProjetoId: () => string;
    getCreatedAt: () => Date;
}
export {};
