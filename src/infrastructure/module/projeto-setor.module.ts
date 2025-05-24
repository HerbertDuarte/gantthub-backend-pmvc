import { Module } from '@nestjs/common';
import { DatabaseModule } from '../plugins/database/database.module';
import { ProjetoSetorController } from '../adapter/controller/projeto-setor.controller';
import { ProjetoSetorPrismaRepository } from '../repository/projeto-setor-prisma.repository';
import { VincularProjetoSetorUseCase } from '@/src/domain/application/usecases/projeto-setor/vincular-projeto-setor.usecase';
import { DesvincularProjetoSetorUseCase } from '@/src/domain/application/usecases/projeto-setor/desvincular-projeto-setor.usecase';
import { BuscarPorProjetoProjetoSetorUseCase } from '@/src/domain/application/usecases/projeto-setor/buscar-por-projeto.usecase';
import { BuscarPorSetorProjetoSetorUseCase } from '@/src/domain/application/usecases/projeto-setor/buscar-por-setor.usecase';
import { BuscarTodosProjetoSetorUseCase } from '@/src/domain/application/usecases/projeto-setor/buscar-todos.usecase';
import { BuscarSetoresProjetoPaginacaoUseCase } from '@/src/domain/application/usecases/projeto-setor/buscar-setores-projeto-paginacao.usecase';
import { BuscarProjetosSetorPaginacaoUseCase } from '@/src/domain/application/usecases/projeto-setor/buscar-projetos-setor-paginacao.usecase';
import { PaginateSetorProjetoService } from '../adapter/service/paginate-setor-projeto.service';
import { PaginateProjetoSetorService } from '../adapter/service/paginate-projeto-setor.service';
import { PrismaService } from '../plugins/database/services/prisma.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ProjetoSetorController],
  providers: [
    PrismaService,
    ProjetoSetorPrismaRepository,
    PaginateSetorProjetoService,
    PaginateProjetoSetorService,
    VincularProjetoSetorUseCase,
    DesvincularProjetoSetorUseCase,
    BuscarPorProjetoProjetoSetorUseCase,
    BuscarPorSetorProjetoSetorUseCase,
    BuscarTodosProjetoSetorUseCase,
    BuscarSetoresProjetoPaginacaoUseCase,
    BuscarProjetosSetorPaginacaoUseCase,
  ],
  exports: [ProjetoSetorPrismaRepository],
})
export class ProjetoSetorModule {}
