import { randomUUID } from 'crypto';

type MarcoProps = {
  id?: string;
  nome: string;
  descricao: string;
  projetoId: string;
  createdAt?: Date;
};

export class Marco {
  private id: string;
  private nome: string;
  private descricao: string;
  private projetoId: string;
  private createdAt: Date;

  constructor(props: MarcoProps) {
    this.validate(props);
    this.id = props.id ?? randomUUID();
    this.nome = props.nome;
    this.descricao = props.descricao;
    this.projetoId = props.projetoId;
    this.createdAt = props.createdAt ?? new Date();
  }

  private validate(props: MarcoProps) {
    this.validateNome(props.nome);
    this.validateDescricao(props.descricao);
  }

  private validateNome(nome: string) {
    if (nome.length < 3) {
      throw new Error('Nome do marco deve ter no mínimo 3 caracteres');
    }
  }

  private validateDescricao(descricao: string) {
    if (descricao.length < 3) {
      throw new Error('Descrição do marco deve ter no mínimo 3 caracteres');
    }
  }

  public getId = () => this.id;
  public getNome = () => this.nome;
  public getDescricao = () => this.descricao;
  public getProjetoId = () => this.projetoId;
  public getCreatedAt = () => this.createdAt;
}
