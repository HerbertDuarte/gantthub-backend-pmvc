import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CriaSetorDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @MinLength(2, {
    message: 'Nome do setor deve ter no mínimo 2 caracteres',
  })
  nome: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'A cor é obrigatória' })
  cor: string;
}
