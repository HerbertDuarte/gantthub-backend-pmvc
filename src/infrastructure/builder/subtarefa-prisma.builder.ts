import { SubTarefaPrisma } from '@prisma/client';
import { randomUUID } from 'crypto';
import { CriaSubTarefaDto } from '@/src/domain/application/dto/subtarefa/cria-subtarefa.dto';

export class SubTarefaPrismaBuilder {
  static build(data: CriaSubTarefaDto): SubTarefaPrisma {
    return {
      id: randomUUID(),
      createdAt: new Date(),
      nome: data.nome,
      dataInicio: data.dataInicio,
      dataFim: data.dataFim,
      descricao: data.descricao,
      status: data.status,
      justificativa: data.justificativa || null,
      usuarioId: data.usuarioId,
      tarefaPaiId: data.tarefaPaiId,
    };
  }
}
