import { Injectable, BadRequestException } from '@nestjs/common';
import { UseCase } from '@/src/core/interfaces/usecase.interface';
import { ProjetoPrisma } from '@prisma/client';
import { CriaProjetoDto } from '../../dto/projeto/cria-projeto.dto';
import { ProjetoPrismaRepository } from '@/src/infrastructure/repository/projeto-prisma.repository';

@Injectable()
export class CriarProjetoUseCase implements UseCase<ProjetoPrisma> {
  constructor(private readonly projetoRepository: ProjetoPrismaRepository) {}

  async execute(dados: CriaProjetoDto, userId: string): Promise<ProjetoPrisma> {
    if (!dados.nome || dados.nome.length < 3) {
      throw new BadRequestException(
        'Nome do projeto deve ter no mínimo 3 caracteres, sem caracteres especiais',
      );
    }

    return this.projetoRepository.create(dados.nome, dados.descricao, userId);
  }
}
