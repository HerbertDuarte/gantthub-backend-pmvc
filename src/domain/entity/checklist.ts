import { randomUUID } from 'crypto';

type CheckListProps = {
  id?: string;
  nome: string;
  createdAt?: Date;
  tarefaId: string;
};

export class CheckList {
  private id: string;
  private nome: string;
  private createdAt: Date;
  private tarefaId: string;

  constructor(props: CheckListProps) {
    this.validate(props);
    this.id = props.id ?? randomUUID();
    this.nome = props.nome;
    this.createdAt = props.createdAt ?? new Date();
    this.tarefaId = props.tarefaId;
  }

  private validate(props: CheckListProps) {
    this.validateNome(props);
  }

  private validateNome({ nome }: CheckListProps) {
    if (nome.length === 0) {
      throw new Error('Nome é obrigatório');
    }
  }

  public getId = () => this.id;
  public getNome = () => this.nome;
  public getCreatedAt = () => this.createdAt;
  public getTarefaId = () => this.tarefaId;
}
