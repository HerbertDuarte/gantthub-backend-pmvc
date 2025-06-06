import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CriaProjetoSetorDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'O ID do projeto é obrigatório' })
  projetoId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'O ID do setor é obrigatório' })
  setorId: string;
}
