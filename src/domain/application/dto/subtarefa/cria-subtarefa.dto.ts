export interface CriaSubTarefaDto {
  nome: string;
  dataFim: Date;
  dataInicio: Date;
  descricao?: string;
  status: number;
  justificativa?: string;
  usuarioId: string;
  tarefaPaiId: string;
}
