type CheckListProps = {
    id?: string;
    nome: string;
    createdAt?: Date;
    tarefaId: string;
};
export declare class CheckList {
    private id;
    private nome;
    private createdAt;
    private tarefaId;
    constructor(props: CheckListProps);
    private validate;
    private validateNome;
    getId: () => string;
    getNome: () => string;
    getCreatedAt: () => Date;
    getTarefaId: () => string;
}
export {};
