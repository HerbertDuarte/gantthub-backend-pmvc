import { Module } from '@nestjs/common';
import { TarefaController } from '../adapter/controller/tarefa.controller';
import { PrismaService } from '../plugins/database/services/prisma.service';
import { AtualizaStatusTarefaUsecase } from '@/src/domain/application/usecases/tarefa/atualiza-status-tarefa.usecase';
import { TarefaPrismaRepository } from '../repository/tarefa-prisma.repository';
import { CriarTarefaUseCase } from '@/src/domain/application/usecases/tarefa/criar-tarefa.usecase';
import { BuscarPorIdTarefaUseCase } from '@/src/domain/application/usecases/tarefa/buscar-por-id-tarefa.usecase';
import { AtualizarTarefaUseCase } from '@/src/domain/application/usecases/tarefa/atualizar-tarefa.usecase';
import { DeletarTarefaUseCase } from '@/src/domain/application/usecases/tarefa/deletar-tarefa.usecase';

@Module({
  controllers: [TarefaController],
  providers: [
    PrismaService,
    TarefaPrismaRepository,
    CriarTarefaUseCase,
    BuscarPorIdTarefaUseCase,
    AtualizarTarefaUseCase,
    DeletarTarefaUseCase,
    AtualizaStatusTarefaUsecase,
  ],
})
export class TarefaModule {}
