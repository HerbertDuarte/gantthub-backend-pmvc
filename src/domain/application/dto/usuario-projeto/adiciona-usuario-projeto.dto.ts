import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AdicionaUsuarioProjetoDto {
  @ApiProperty()
  @IsNotEmpty({
    message: 'Informe o ID do usuário',
  })
  @IsString()
  usuarioId: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'Informe o ID do projeto',
  })
  @IsString()
  projetoId: string;
}
