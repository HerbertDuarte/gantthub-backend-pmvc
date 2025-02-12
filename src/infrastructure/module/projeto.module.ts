import { Module } from '@nestjs/common';
import { PrismaService } from '../plugins/database/services/prisma.service';
import { ProjetoController } from '../adapter/controller/projeto.controller';

@Module({
  providers: [PrismaService],
  controllers: [ProjetoController],
})
export class ProjetoModule {}
