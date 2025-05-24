import { SetorPrisma } from '@prisma/client';
import { randomUUID } from 'crypto';
import { CriaSetorDto } from '@/src/domain/application/dto/setor/cria-setor.dto';

export class SetorPrismaBuilder {
  static build(data: CriaSetorDto): SetorPrisma {
    return {
      setorId: randomUUID(),
      nome: data.nome,
      cor: data.cor,
    };
  }
}
