import { randomUUID } from 'crypto';

type ProjetoProps = {
  id?: string;
  nome: string;
  descricao: string;
  createdAt?: Date;
};

export class Projeto {
  private id: string;
  private nome: string;
  private descricao: string;
  private createdAt: Date;

  constructor(props: ProjetoProps) {
    this.validate(props);
    this.id = props.id ?? randomUUID();
    this.nome = props.nome;
    this.descricao = props.descricao;
    this.createdAt = props.createdAt ?? new Date();
  }

  private validate(props: ProjetoProps) {
    this.validateNome(props.nome);
    this.validateDescricao(props.descricao);
  }

  private validateNome(nome: string) {
    if (nome.length < 3) {
      throw new Error('Nome do projeto deve ter no mínimo 3 caracteres');
    }
  }

  private validateDescricao(descricao: string) {
    if (descricao.length < 3) {
      throw new Error('Descrição do projeto deve ter no mínimo 3 caracteres');
    }
  }

  public getId = () => this.id;
  public getNome = () => this.nome;
  public getDescricao = () => this.descricao;
  public getCreatedAt = () => this.createdAt;
}
