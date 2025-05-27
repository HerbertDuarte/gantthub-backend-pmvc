import { Module } from '@nestjs/common';
import { DatabaseModule } from '../plugins/database/database.module';
import { UsuarioSetorController } from '../adapter/controller/usuario-setor.controller';
import { UsuarioSetorPrismaRepository } from '../repository/usuario-setor-prisma.repository';
import { VincularUsuarioSetorUseCase } from '@/src/domain/application/usecases/usuario-setor/vincular-usuario-setor.usecase';
import { DesvincularUsuarioSetorUseCase } from '@/src/domain/application/usecases/usuario-setor/desvincular-usuario-setor.usecase';
import { BuscarPorUsuarioUsuarioSetorUseCase } from '@/src/domain/application/usecases/usuario-setor/buscar-por-usuario.usecase';
import { BuscarPorSetorUsuarioSetorUseCase } from '@/src/domain/application/usecases/usuario-setor/buscar-por-setor.usecase';
import { BuscarTodosUsuarioSetorUseCase } from '@/src/domain/application/usecases/usuario-setor/buscar-todos.usecase';
import { PrismaService } from '../plugins/database/services/prisma.service';
import { BuscarUsuariosSetorPaginacaoUseCase } from '@/src/domain/application/usecases/usuario-setor/buscar-usuarios-setor-paginacao.usecase';
import { PaginateUsuarioSetorService } from '../adapter/service/paginate-usuario-setor.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UsuarioSetorController],
  providers: [
    PrismaService,
    UsuarioSetorPrismaRepository,
    VincularUsuarioSetorUseCase,
    DesvincularUsuarioSetorUseCase,
    BuscarPorUsuarioUsuarioSetorUseCase,
    BuscarPorSetorUsuarioSetorUseCase,
    BuscarTodosUsuarioSetorUseCase,
    BuscarUsuariosSetorPaginacaoUseCase,
    PaginateUsuarioSetorService,
  ],
  exports: [UsuarioSetorPrismaRepository],
})
export class UsuarioSetorModule {}
