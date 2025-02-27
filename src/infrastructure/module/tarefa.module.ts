import { Module } from '@nestjs/common';
import { PrismaService } from '../plugins/database/services/prisma.service';
import { TarefaController } from '../adapter/controller/tarefa.controller';

@Module({
  providers: [PrismaService],
  controllers: [TarefaController],
})
export class TarefaModule {}
