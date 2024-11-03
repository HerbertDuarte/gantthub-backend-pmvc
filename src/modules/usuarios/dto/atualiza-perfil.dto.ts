import {
  IsOptional,
  IsString,
  IsEmail,
  ValidateIf,
  IsNotEmpty,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { EnumSituacaoUsuario } from '../enum/usuario-situacao.enum';
import { EnumUsuarioNivel } from '../enum/usuario-nivel.enum';

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
  @IsString()
  nivel?: EnumUsuarioNivel;

  @ApiProperty()
  @IsOptional()
  @IsString()
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
