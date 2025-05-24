import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RemoveUsuarioSetorDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  usuarioId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  projetoId: string;
}
