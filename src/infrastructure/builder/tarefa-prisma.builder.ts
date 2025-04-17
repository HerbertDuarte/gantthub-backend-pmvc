import { TarefaPrisma } from '@prisma/client';
import { randomUUID } from 'crypto';
import { CriaTarefaDto } from '@/src/domain/application/dto/tarefa/cria-tarefa.dto';

export class TarefaPrismaBuilder {
  static build(data: CriaTarefaDto): TarefaPrisma {
    return {
      id: randomUUID(),
      createdAt: new Date(),
      nome: data.nome,
      dataInicio: data.dataInicio,
      dataFim: data.dataFim,
      descricao: data.descricao || '',
      status: data.status,
      justificativa: null,
      usuarioId: data.usuarioId,
      marcoId: data.marcoId,
    };
  }
}
