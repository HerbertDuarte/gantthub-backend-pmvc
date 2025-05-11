import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { PaginatePropsBase } from 'lib-test-herbert';

export class PaginateSetorDto implements PaginatePropsBase {
  @ApiProperty()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  pagina: number;

  @ApiProperty()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  itensPorPagina: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  busca?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  setorPaiId?: string;
}
