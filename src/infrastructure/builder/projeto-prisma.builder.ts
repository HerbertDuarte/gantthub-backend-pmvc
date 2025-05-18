import { ProjetoPrisma } from '@prisma/client';

export class ProjetoPrismaBuilder {
  static build(input: {
    nome: string;
    descricao: string;
    createdById: string;
  }): ProjetoPrisma {
    const { nome, descricao, createdById } = input;

    return {
      id: undefined,
      nome,
      descricao,
      createdById,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as ProjetoPrisma;
  }
}
