import { ApiProperty } from '@nestjs/swagger';

export class AutenticaUsuarioDto {
  @ApiProperty({
    description: 'Login do usuário',
    example: 'admin',
  })
  username: string;

  @ApiProperty({
    description: 'Senha do usuário',
    example: '123456',
  })
  password: string;
}
