import { Controller, Get } from '@nestjs/common';

@Controller('tarefa')
export class TarefaController {
  @Get()
  getAll() {
    return;
  }
}
