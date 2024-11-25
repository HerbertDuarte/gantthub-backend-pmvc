import { IsNotEmpty, IsString, IsEmail, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { EnumSituacaoUsuario } from '../enum/usuario-situacao.enum';

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
    message: 'Informe a situação do Usuário',
  })
  @IsNumber()
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
