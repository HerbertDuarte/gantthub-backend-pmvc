import {
  IsOptional,
  IsString,
  IsEmail,
  IsNumber,
  IsEnum,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { EnumSituacaoUsuario } from '../../../enum/usuario-situacao.enum';
import { EnumRoleUsuario } from '@/src/domain/enum/usuario-role.enum';

export class AtualizaUsuarioDto {
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
  @IsEnum(EnumSituacaoUsuario)
  @IsNumber()
  situacao?: EnumSituacaoUsuario;

  @ApiProperty()
  @IsOptional()
  @IsEnum(EnumRoleUsuario)
  @IsNumber()
  role?: EnumRoleUsuario;

  @ApiProperty()
  @IsOptional()
  @IsString()
  login?: string;

  @ApiProperty()
  @IsOptional()
  senhaNova?: string;

  @ApiProperty()
  @IsOptional()
  senhaAntiga?: string;
}
