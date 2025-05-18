import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class AtualizaProjetoDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @MinLength(3, {
    message:
      'Nome do projeto deve ter no mínimo 3 caracteres, sem caracteres especiais',
  })
  nome: string;

  @ApiProperty()
  @IsString()
  descricao: string;
}
