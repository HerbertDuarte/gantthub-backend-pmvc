import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class PaginateUsuarioSetorDto {
  @ApiPropertyOptional({
    description: 'Termo de busca para filtrar por nome ou email do usuário',
  })
  @IsOptional()
  @IsString()
  busca?: string;

  @ApiPropertyOptional({ default: 1, minimum: 1 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  pagina?: number = 1;

  @ApiPropertyOptional({ default: 10, minimum: 1 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  itensPorPagina?: number = 10;
}
