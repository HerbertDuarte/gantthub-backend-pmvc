import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { EnumUsuarioNivel } from '../enum/usuario-nivel.enum';
import { Transform } from 'class-transformer';
import { PaginatePropsBase } from 'lib-test-herbert';

export class PaginateUsuarioDto implements PaginatePropsBase {
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
  @IsEnum(EnumUsuarioNivel)
  @IsOptional()
  nivel?: EnumUsuarioNivel;
}
