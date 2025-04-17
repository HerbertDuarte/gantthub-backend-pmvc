import { Module } from '@nestjs/common';
import { SubTarefaController } from '../adapter/controller/subtarefa.controller';
import { PrismaService } from '../plugins/database/services/prisma.service';
import { AtualizaStatusSubTarefaUsecase } from '@/src/domain/application/usecases/subtarefa/atualiza-status-subtarefa.usecase';
import { SubtarefaValidatorService } from '../adapter/service/subtarefa-validator.service';
import { SubTarefaPrismaRepository } from '../repository/subtarefa-prisma.repository';
import { CriarSubTarefaUseCase } from '@/src/domain/application/usecases/subtarefa/criar-subtarefa.usecase';
import { BuscarPorIdSubTarefaUseCase } from '@/src/domain/application/usecases/subtarefa/buscar-por-id-subtarefa.usecase';
import { AtualizarSubTarefaUseCase } from '@/src/domain/application/usecases/subtarefa/atualizar-subtarefa.usecase';
import { DeletarSubTarefaUseCase } from '@/src/domain/application/usecases/subtarefa/deletar-subtarefa.usecase';

@Module({
  controllers: [SubTarefaController],
  providers: [
    PrismaService,
    SubTarefaPrismaRepository,
    SubtarefaValidatorService,
    CriarSubTarefaUseCase,
    BuscarPorIdSubTarefaUseCase,
    AtualizarSubTarefaUseCase,
    DeletarSubTarefaUseCase,
    AtualizaStatusSubTarefaUsecase,
  ],
})
export class SubTarefaModule {}
