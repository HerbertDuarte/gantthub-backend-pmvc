import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CriaUsuarioSetorDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  usuarioId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  setorId: string;
}
