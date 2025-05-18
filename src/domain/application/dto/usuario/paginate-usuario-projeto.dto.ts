import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { PaginatePropsBase } from 'lib-test-herbert';
import { EnumSituacaoUsuario } from '@/src/domain/enum/usuario-situacao.enum';

export class PaginateUsuarioProjetoDto implements PaginatePropsBase {
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
  @IsEnum(EnumSituacaoUsuario)
  @IsOptional()
  @Transform(({ value }) => Number(value))
  situacao?: number;
}
