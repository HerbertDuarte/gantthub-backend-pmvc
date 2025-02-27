import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { PrismaService } from '../../plugins/database/services/prisma.service';
import { MarcoPrisma } from '@prisma/client';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';

@Controller('marco')
export class MarcoController {
  constructor(private readonly prisma: PrismaService) {}

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getOne(@Param('id') marcoId: string) {
    const marco = await this.prisma.marcoPrisma.findUnique({
      where: {
        id: marcoId,
      },
    });

    if (!marco) {
      throw new NotFoundException('Marco não encontrado');
    }

    return marco;
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() { nome, projetoId }: MarcoPrisma) {
    return this.prisma.marcoPrisma.create({
      data: {
        nome,
        projetoId,
      },
    });
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async udpate(@Body() { nome }: MarcoPrisma, @Param('id') marcoId: string) {
    const marcoExists = await this.prisma.marcoPrisma.findUnique({
      where: {
        id: marcoId,
      },
    });

    if (!marcoExists) {
      throw new NotFoundException('Marco não encontrado');
    }

    return this.prisma.marcoPrisma.update({
      where: {
        id: marcoId,
      },
      data: {
        nome,
      },
    });
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') marcoId: string) {
    const marcoExists = await this.prisma.marcoPrisma.findUnique({
      where: {
        id: marcoId,
      },
    });

    if (!marcoExists) {
      throw new NotFoundException('Marco não encontrado');
    }

    return this.prisma.marcoPrisma.delete({
      where: {
        id: marcoId,
      },
    });
  }
}
