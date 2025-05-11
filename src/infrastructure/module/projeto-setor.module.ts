import { Module } from '@nestjs/common';
import { DatabaseModule } from '../plugins/database/database.module';
import { ProjetoSetorController } from '../adapter/controller/projeto-setor.controller';
import { SetorPrismaRepository } from '../repository/setor-prisma.repository';
import { BuscarPorProjetoProjetoSetorUseCase } from '@/src/domain/application/usecases/projeto-setor/buscar-por-projeto.usecase';
import { BuscarPorSetorProjetoSetorUseCase } from '@/src/domain/application/usecases/projeto-setor/buscar-por-setor.usecase';
import { VincularProjetoSetorUseCase } from '@/src/domain/application/usecases/projeto-setor/vincular-projeto-setor.usecase';
import { DesvincularProjetoSetorUseCase } from '@/src/domain/application/usecases/projeto-setor/desvincular-projeto-setor.usecase';

@Module({
  imports: [DatabaseModule],
  controllers: [ProjetoSetorController],
  providers: [
    SetorPrismaRepository,
    BuscarPorProjetoProjetoSetorUseCase,
    BuscarPorSetorProjetoSetorUseCase,
    VincularProjetoSetorUseCase,
    DesvincularProjetoSetorUseCase,
  ],
  exports: [],
})
export class ProjetoSetorModule {}
