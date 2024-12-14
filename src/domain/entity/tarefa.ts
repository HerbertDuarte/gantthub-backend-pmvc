import { randomUUID } from 'crypto';
import { TarefaStatusEnum } from '../enum/tarefa-status.enum';

type TarefaProps = {
  id?: string;
  nome: string;
  descricao: string;
  dataInicio: Date;
  dataFim: Date;
  status?: TarefaStatusEnum;
  marcoId: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export class Tarefa {
  private id: string;
  private nome: string;
  private descricao: string;
  private dataInicio: Date;
  private dataFim: Date;
  private status: TarefaStatusEnum;
  private createdAt: Date;
  private updatedAt: Date;
  private marcoId: string;
  private emAtraso: boolean;

  constructor(props: TarefaProps) {
    this.validate(props);
    this.id = props.id ?? randomUUID();
    this.nome = props.nome;
    this.descricao = props.descricao;
    this.dataInicio = props.dataInicio;
    this.dataFim = props.dataFim;
    this.status = props.status ?? TarefaStatusEnum.NAO_INICIADA;
    this.createdAt = props.createdAt ?? new Date();
    this.updatedAt = props.updatedAt ?? null;
    this.marcoId = props.marcoId;
    this.emAtraso = this.isEmAtraso(props);
  }

  private validate(props: TarefaProps) {
    this.validateDataFim(props);
  }

  private validateDataFim({ dataFim, dataInicio }: TarefaProps) {
    if (dataFim < dataInicio) {
      throw new Error('Data de fim não pode ser menor que a data de início');
    }
  }

  private isEmAtraso({ dataFim, status }: TarefaProps) {
    const statusPermitidos = [
      TarefaStatusEnum.CONCLUIDA,
      TarefaStatusEnum.CONCLUIDA_COM_ATRASO,
    ];
    if (statusPermitidos.includes(status)) {
      return false;
    }
    return dataFim < new Date();
  }

  public atualizarStatus(status: TarefaStatusEnum) {
    if (status === TarefaStatusEnum.NAO_INICIADA) {
      this.parar();
    }

    if (status === TarefaStatusEnum.EM_ANDAMENTO) {
      this.iniciar();
    }

    if (status === TarefaStatusEnum.CONCLUIDA) {
      this.concluir();
    }

    if (status === TarefaStatusEnum.PENDENTE) {
      this.adicionarPendencia();
    }
  }

  private parar() {
    this.status = TarefaStatusEnum.PENDENTE;
    this.touch();
  }

  private concluir() {
    this.status = this.emAtraso
      ? TarefaStatusEnum.CONCLUIDA_COM_ATRASO
      : TarefaStatusEnum.CONCLUIDA;
    this.touch();
  }

  private iniciar() {
    this.status = TarefaStatusEnum.EM_ANDAMENTO;
    this.touch();
  }

  private adicionarPendencia() {
    this.status = TarefaStatusEnum.PENDENTE;
    this.touch();
  }

  private touch() {
    this.updatedAt = new Date();
  }

  public getId = () => this.id;
  public getNome = () => this.nome;
  public getDescricao = () => this.descricao;
  public getDataInicio = () => this.dataInicio;
  public getDataFim = () => this.dataFim;
  public getStatus = () => this.status;
  public getCreatedAt = () => this.createdAt;
  public getUpdatedAt = () => this.updatedAt;
  public getEmAtraso = () => this.emAtraso;
  public getmarcoId = () => this.marcoId;
}
