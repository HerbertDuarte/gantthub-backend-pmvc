import { SetorPrisma } from '@prisma/client';
import { randomUUID } from 'crypto';
import { CriaSetorDto } from '@/src/domain/application/dto/setor/cria-setor.dto';

export class SetorPrismaBuilder {
  static build(data: CriaSetorDto): SetorPrisma {
    return {
      id: randomUUID(),
      nome: data.nome,
      createdAt: new Date(),
      setorPaiId: data.setorPaiId || null,
    };
  }
}
