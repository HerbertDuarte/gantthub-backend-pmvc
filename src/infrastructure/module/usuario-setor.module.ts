import { Module } from '@nestjs/common';
import { DatabaseModule } from '../plugins/database/database.module';
import { UsuarioSetorController } from '../adapter/controller/usuario-setor.controller';
import { UsuarioSetorPrismaRepository } from '../repository/usuario-setor-prisma.repository';
import { VincularUsuarioSetorUseCase } from '@/src/domain/application/usecases/usuario-setor/vincular-usuario-setor.usecase';
import { DesvincularUsuarioSetorUseCase } from '@/src/domain/application/usecases/usuario-setor/desvincular-usuario-setor.usecase';
import { BuscarPorUsuarioUsuarioSetorUseCase } from '@/src/domain/application/usecases/usuario-setor/buscar-por-usuario.usecase';
import { BuscarPorProjetoUsuarioSetorUseCase } from '@/src/domain/application/usecases/usuario-setor/buscar-por-projeto.usecase';
import { BuscarTodosUsuarioSetorUseCase } from '@/src/domain/application/usecases/usuario-setor/buscar-todos.usecase';
import { BuscarUsuariosProjetoPaginacaoUseCase } from '@/src/domain/application/usecases/usuario-setor/buscar-usuarios-projeto-paginacao.usecase';
import { BuscarProjetosUsuarioPaginacaoUseCase } from '@/src/domain/application/usecases/usuario-setor/buscar-projetos-usuario-paginacao.usecase';
import { PaginateUsuarioProjetoSetorService } from '../adapter/service/paginate-usuario-projeto-setor.service';
import { PaginateProjetoUsuarioService } from '../adapter/service/paginate-projeto-usuario.service';
import { PrismaService } from '../plugins/database/services/prisma.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UsuarioSetorController],
  providers: [
    PrismaService,
    UsuarioSetorPrismaRepository,
    PaginateUsuarioProjetoSetorService,
    PaginateProjetoUsuarioService,
    VincularUsuarioSetorUseCase,
    DesvincularUsuarioSetorUseCase,
    BuscarPorUsuarioUsuarioSetorUseCase,
    BuscarPorProjetoUsuarioSetorUseCase,
    BuscarTodosUsuarioSetorUseCase,
    BuscarUsuariosProjetoPaginacaoUseCase,
    BuscarProjetosUsuarioPaginacaoUseCase,
  ],
  exports: [UsuarioSetorPrismaRepository],
})
export class UsuarioSetorModule {}
