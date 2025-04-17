export interface CriaTarefaDto {
  nome: string;
  dataFim: Date;
  dataInicio: Date;
  descricao?: string;
  status: number;
  usuarioId: string;
  marcoId: string;
}
