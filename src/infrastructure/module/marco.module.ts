import { Module } from '@nestjs/common';
import { PrismaService } from '../plugins/database/services/prisma.service';
import { MarcoController } from '../adapter/controller/marco.controller';

@Module({
  providers: [PrismaService],
  controllers: [MarcoController],
})
export class MarcoModule {}
