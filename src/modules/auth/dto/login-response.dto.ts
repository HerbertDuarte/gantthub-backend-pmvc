import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDto {
  @ApiProperty()
  access_token: string;
  @ApiProperty()
  usuarioId: string;
  @ApiProperty()
  nivel: string;
}
