import {
  IsOptional,
  IsString,
  IsEmail,
  ValidateIf,
  IsNotEmpty,
  IsNumber,
  IsEnum,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { EnumSituacaoUsuario } from '../../../enum/usuario-situacao.enum';

export class AtualizaPerfilUsuarioDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  nome?: string;

  @ApiProperty()
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @IsEnum(EnumSituacaoUsuario)
  situacao?: EnumSituacaoUsuario;

  @ApiProperty()
  @IsOptional()
  @IsString()
  login?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  senhaNova?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  senhaAntiga?: string;
}
