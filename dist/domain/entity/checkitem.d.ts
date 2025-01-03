type CheckItemProps = {
    id?: string;
    nome: string;
    checked?: boolean;
    createdAt?: Date;
    checkListId: string;
};
export declare class CheckItem {
    private id;
    private nome;
    private createdAt;
    private checkListId;
    private checked;
    constructor(props: CheckItemProps);
    private validate;
    private validateNome;
    check(): void;
    uncheck(): void;
    updateName(nome: string): void;
    getId: () => string;
    getNome: () => string;
    getChecked: () => boolean;
    getCreatedAt: () => Date;
    getCheckListId: () => string;
}
export {};
