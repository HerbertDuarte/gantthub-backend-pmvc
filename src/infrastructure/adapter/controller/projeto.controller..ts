import { Controller, Get } from '@nestjs/common';
import { ProjetoPrismaRepository } from 'src/infrastructure/repository/projeto-prisma.repository';

@Controller('projeto')
export class ProjetoController {
  constructor(
    private readonly projetoPrismaRepository: ProjetoPrismaRepository,
  ) {}
  @Get()
  async getAll() {
    return this.projetoPrismaRepository.getOne();
  }
}
