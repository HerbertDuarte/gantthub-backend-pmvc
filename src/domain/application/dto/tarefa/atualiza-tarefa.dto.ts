export interface AtualizaTarefaDto {
  nome?: string;
  dataFim?: Date;
  dataInicio?: Date;
  descricao?: string;
  status?: number;
  justificativa?: string;
}
