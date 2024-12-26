import { Controller, Get, UseGuards } from '@nestjs/common';
import { ProjetoPrismaRepository } from 'src/infrastructure/repository/projeto-prisma.repository';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';

@Controller('projeto')
export class ProjetoController {
  constructor(
    private readonly projetoPrismaRepository: ProjetoPrismaRepository,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll() {
    return this.projetoPrismaRepository.getOne();
  }
}
