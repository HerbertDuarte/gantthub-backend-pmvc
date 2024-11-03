import { IsNotEmpty, IsString, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { EnumSituacaoUsuario } from '../enum/usuario-situacao.enum';
import { EnumUsuarioNivel } from '../enum/usuario-nivel.enum';

export class CriaUsuarioDto {
  @ApiProperty()
  @IsNotEmpty({
    message: 'Informe o Nome',
  })
  @IsString()
  nome: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'Informe o Email',
  })
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'Informe o nível do Usuário',
  })
  @IsString()
  nivel: EnumUsuarioNivel;

  @ApiProperty()
  @IsNotEmpty({
    message: 'Informe a situação do Usuário',
  })
  @IsString()
  situacao: EnumSituacaoUsuario;

  @ApiProperty()
  @IsNotEmpty({
    message: 'Informe o Login',
  })
  @IsString()
  login: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'Informe a Senha',
  })
  @IsString()
  senha: string;
}
