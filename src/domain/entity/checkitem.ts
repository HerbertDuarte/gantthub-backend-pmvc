import { randomUUID } from 'crypto';

type CheckItemProps = {
  id?: string;
  nome: string;
  checked?: boolean;
  createdAt?: Date;
  checkListId: string;
};

export class CheckItem {
  private id: string;
  private nome: string;
  private createdAt: Date;
  private checkListId: string;
  private checked: boolean;

  constructor(props: CheckItemProps) {
    this.validate(props);
    this.id = props.id ?? randomUUID();
    this.nome = props.nome;
    this.checked = props.checked ?? false;
    this.createdAt = props.createdAt ?? new Date();
    this.checkListId = props.checkListId;
  }

  private validate(props: CheckItemProps) {
    this.validateNome(props);
  }

  private validateNome({ nome }: CheckItemProps) {
    if (nome.length === 0) {
      throw new Error('Nome é obrigatório');
    }
  }

  public check() {
    this.checked = true;
  }

  public uncheck() {
    this.checked = false;
  }

  public updateName(nome: string) {
    this.nome = nome;
  }

  public getId = () => this.id;
  public getNome = () => this.nome;
  public getChecked = () => this.checked;
  public getCreatedAt = () => this.createdAt;
  public getCheckListId = () => this.checkListId;
}
