import { Module } from '@nestjs/common';
import { SetorController } from '../adapter/controller/setor.controller';
import { PrismaService } from '../plugins/database/services/prisma.service';
import { SetorPrismaRepository } from '../repository/setor-prisma.repository';
import { CriarSetorUseCase } from '@/src/domain/application/usecases/setor/criar-setor.usecase';
import { BuscarPorIdSetorUseCase } from '@/src/domain/application/usecases/setor/buscar-por-id-setor.usecase';
import { AtualizarSetorUseCase } from '@/src/domain/application/usecases/setor/atualizar-setor.usecase';
import { DeletarSetorUseCase } from '@/src/domain/application/usecases/setor/deletar-setor.usecase';
import { ListarSetoresUseCase } from '@/src/domain/application/usecases/setor/listar-setores.usecase';

@Module({
  controllers: [SetorController],
  providers: [
    PrismaService,
    SetorPrismaRepository,
    CriarSetorUseCase,
    BuscarPorIdSetorUseCase,
    AtualizarSetorUseCase,
    DeletarSetorUseCase,
    ListarSetoresUseCase,
  ],
})
export class SetorModule {}
