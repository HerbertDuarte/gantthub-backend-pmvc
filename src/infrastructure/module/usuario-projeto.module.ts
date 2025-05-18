import { Module } from '@nestjs/common';
import { DatabaseModule } from '../plugins/database/database.module';
import { UsuarioProjetoController } from '../adapter/controller/usuario-projeto.controller';
import { UsuarioProjetoPrismaRepository } from '../repository/usuario-projeto-prisma.repository';
import { VincularUsuarioProjetoUseCase } from '@/src/domain/application/usecases/usuario-projeto/vincular-usuario-projeto.usecase';
import { DesvincularUsuarioProjetoUseCase } from '@/src/domain/application/usecases/usuario-projeto/desvincular-usuario-projeto.usecase';
import { BuscarPorUsuarioUsuarioProjetoUseCase } from '@/src/domain/application/usecases/usuario-projeto/buscar-por-usuario.usecase';
import { BuscarPorProjetoUsuarioProjetoUseCase } from '@/src/domain/application/usecases/usuario-projeto/buscar-por-projeto.usecase';
import { PrismaService } from '../plugins/database/services/prisma.service';
import { BuscarUsuariosProjetoPaginacaoUseCase } from '@/src/domain/application/usecases/usuario-projeto/buscar-usuarios-projeto-paginacao.usecase';
import { PaginateUsuarioProjetoService } from '../adapter/service/paginate-usuario-projeto.service';
import { ProjetoPrismaRepository } from '../repository/projeto-prisma.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [UsuarioProjetoController],
  providers: [
    PrismaService,
    UsuarioProjetoPrismaRepository,
    ProjetoPrismaRepository,
    PaginateUsuarioProjetoService,
    VincularUsuarioProjetoUseCase,
    DesvincularUsuarioProjetoUseCase,
    BuscarPorUsuarioUsuarioProjetoUseCase,
    BuscarPorProjetoUsuarioProjetoUseCase,
    BuscarUsuariosProjetoPaginacaoUseCase,
  ],
  exports: [UsuarioProjetoPrismaRepository],
})
export class UsuarioProjetoModule {}
