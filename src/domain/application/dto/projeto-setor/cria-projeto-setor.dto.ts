import { IsNotEmpty, IsString } from 'class-validator';

export class CriaProjetoSetorDto {
  @IsString()
  @IsNotEmpty({ message: 'O ID do projeto é obrigatório' })
  projetoId: string;

  @IsString()
  @IsNotEmpty({ message: 'O ID do setor é obrigatório' })
  setorId: string;
}
