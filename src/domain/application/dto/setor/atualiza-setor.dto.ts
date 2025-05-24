import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MinLength } from 'class-validator';

export class AtualizaSetorDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(2, {
    message: 'Nome do setor deve ter no mínimo 2 caracteres',
  })
  nome?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  cor?: string;
}
