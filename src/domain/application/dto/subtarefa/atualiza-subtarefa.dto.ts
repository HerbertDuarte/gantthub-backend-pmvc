export interface AtualizaSubTarefaDto {
  nome?: string;
  dataFim?: Date;
  dataInicio?: Date;
  descricao?: string;
  status?: number;
  justificativa?: string;
  tarefaPaiId?: string;
}
