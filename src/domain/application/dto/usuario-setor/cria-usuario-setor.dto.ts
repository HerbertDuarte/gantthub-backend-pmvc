import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CriaUsuarioSetorDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'O ID do usuário é obrigatório' })
  usuarioId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'O ID do setor é obrigatório' })
  setorId: string;
}
