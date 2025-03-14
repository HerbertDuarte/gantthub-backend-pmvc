import { Module } from '@nestjs/common';
import { PrismaService } from '../plugins/database/services/prisma.service';
import { TarefaController } from '../adapter/controller/tarefa.controller';
import { AtualizaStatusTarefaUsecase } from '@/src/domain/application/usecases/tarefa/atualiza-status-tarefa.usecase';

@Module({
  providers: [PrismaService, AtualizaStatusTarefaUsecase],
  controllers: [TarefaController],
})
export class TarefaModule {}
