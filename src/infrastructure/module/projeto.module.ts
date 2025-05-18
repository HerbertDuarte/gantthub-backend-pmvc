import { Module } from '@nestjs/common';
import { PrismaService } from '../plugins/database/services/prisma.service';
import { ProjetoController } from '../adapter/controller/projeto.controller';
import { ProjetoPrismaRepository } from '../repository/projeto-prisma.repository';
import { BuscarProjetosPaginacaoUseCase } from '@/src/domain/application/usecases/projeto/buscar-projetos-paginacao.usecase';
import { BuscarPorIdProjetoUseCase } from '@/src/domain/application/usecases/projeto/buscar-por-id-projeto.usecase';
import { BuscarPorIdReduzidoProjetoUseCase } from '@/src/domain/application/usecases/projeto/buscar-por-id-reduzido-projeto.usecase';
import { BuscarUsuariosProjetoUseCase } from '@/src/domain/application/usecases/projeto/buscar-usuarios-projeto.usecase';
import { BuscarUsuariosComPrioridadeProjetoUseCase } from '@/src/domain/application/usecases/projeto/buscar-usuarios-com-prioridade-projeto.usecase';
import { CriarProjetoUseCase } from '@/src/domain/application/usecases/projeto/criar-projeto.usecase';
import { AtualizarProjetoUseCase } from '@/src/domain/application/usecases/projeto/atualizar-projeto.usecase';
import { DeletarProjetoUseCase } from '@/src/domain/application/usecases/projeto/deletar-projeto.usecase';
import { PaginateUsuarioProjetoService } from '../adapter/service/paginate-usuario-projeto.service';

@Module({
  providers: [
    PrismaService,
    ProjetoPrismaRepository,
    PaginateUsuarioProjetoService,
    BuscarProjetosPaginacaoUseCase,
    BuscarPorIdProjetoUseCase,
    BuscarPorIdReduzidoProjetoUseCase,
    BuscarUsuariosProjetoUseCase,
    BuscarUsuariosComPrioridadeProjetoUseCase,
    CriarProjetoUseCase,
    AtualizarProjetoUseCase,
    DeletarProjetoUseCase,
  ],
  controllers: [ProjetoController],
})
export class ProjetoModule {}
