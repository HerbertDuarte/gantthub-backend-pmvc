import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RemoveProjetoSetorDto {
  @ApiProperty()
  @IsNotEmpty({
    message: 'Informe o ID do projeto',
  })
  @IsString()
  projetoId: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'Informe o ID do setor',
  })
  @IsString()
  setorId: string;
}
