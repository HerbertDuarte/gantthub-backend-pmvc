import { Module } from '@nestjs/common';
import { DatabaseModule } from '../plugins/database/database.module';
import { UsuarioSetorController } from '../adapter/controller/usuario-setor.controller';
import { UsuarioSetorPrismaRepository } from '../repository/usuario-setor-prisma.repository';
import { BuscarPorUsuarioUseCase } from '@/src/domain/application/usecases/usuario-setor/buscar-por-usuario.usecase';
import { BuscarPorSetorUseCase } from '@/src/domain/application/usecases/usuario-setor/buscar-por-setor.usecase';
import { VincularUsuarioSetorUseCase } from '@/src/domain/application/usecases/usuario-setor/vincular-usuario-setor.usecase';
import { DesvincularUsuarioSetorUseCase } from '@/src/domain/application/usecases/usuario-setor/desvincular-usuario-setor.usecase';

@Module({
  imports: [DatabaseModule],
  controllers: [UsuarioSetorController],
  providers: [
    UsuarioSetorPrismaRepository,
    BuscarPorUsuarioUseCase,
    BuscarPorSetorUseCase,
    VincularUsuarioSetorUseCase,
    DesvincularUsuarioSetorUseCase,
  ],
  exports: [UsuarioSetorPrismaRepository],
})
export class UsuarioSetorModule {}
