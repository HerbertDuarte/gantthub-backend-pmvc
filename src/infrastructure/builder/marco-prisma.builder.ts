import { MarcoPrisma } from '@prisma/client';
import { randomUUID } from 'crypto';
import { CriaMarcoDto } from '@/src/domain/application/dto/marco/cria-marco.dto';

export class MarcoPrismaBuilder {
  static build(data: CriaMarcoDto): MarcoPrisma {
    return {
      id: randomUUID(),
      nome: data.nome,
      projetoId: data.projetoId,
      createdAt: new Date(),
    };
  }
}
