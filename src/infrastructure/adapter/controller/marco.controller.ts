import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { MarcoPrismaRepository } from 'src/infrastructure/repository/marco-prisma.repository';

export type CreateMarcoDto = {
  nome: string;
  projetoId: string;
};

@Controller('marco')
export class MarcoController {
  constructor(private readonly marcoPrismaRepository: MarcoPrismaRepository) {}

  @Post()
  getAll(@Body() body: CreateMarcoDto) {
    return this.marcoPrismaRepository.create(body);
  }

  @Patch(':id')
  updateDescription(
    @Param('id') id: string,
    @Body() body: Partial<CreateMarcoDto>,
  ) {
    return this.marcoPrismaRepository.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.marcoPrismaRepository.delete(id);
  }
}
