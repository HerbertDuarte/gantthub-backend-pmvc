import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RemoveUsuarioSetorDto {
  @ApiProperty()
  @IsNotEmpty({
    message: 'Informe o ID do usuário',
  })
  @IsString()
  usuarioId: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'Informe o ID do setor',
  })
  @IsString()
  setorId: string;
}
