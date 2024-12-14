import { Injectable } from '@nestjs/common';
import { PrismaService } from '../plugins/database/services/prisma.service';

@Injectable()
export class TarefaPrismaRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public async getAll() {
    return this.prismaService.tarefaPrisma.findMany();
  }
}
