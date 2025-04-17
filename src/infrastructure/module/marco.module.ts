import { Module } from '@nestjs/common';
import { MarcoController } from '../adapter/controller/marco.controller';
import { PrismaService } from '../plugins/database/services/prisma.service';
import { MarcoPrismaRepository } from '../repository/marco-prisma.repository';
import { CriarMarcoUseCase } from '@/src/domain/application/usecases/marco/criar-marco.usecase';
import { BuscarPorIdMarcoUseCase } from '@/src/domain/application/usecases/marco/buscar-por-id-marco.usecase';
import { AtualizarMarcoUseCase } from '@/src/domain/application/usecases/marco/atualizar-marco.usecase';
import { DeletarMarcoUseCase } from '@/src/domain/application/usecases/marco/deletar-marco.usecase';

@Module({
  controllers: [MarcoController],
  providers: [
    PrismaService,
    MarcoPrismaRepository,
    CriarMarcoUseCase,
    BuscarPorIdMarcoUseCase,
    AtualizarMarcoUseCase,
    DeletarMarcoUseCase,
  ],
})
export class MarcoModule {}
