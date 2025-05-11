import { Injectable } from '@nestjs/common';
import {
  SetorPrismaExtended,
  SetorPrismaRepository,
} from '@/src/infrastructure/repository/setor-prisma.repository';
import { PaginateResponse } from 'lib-test-herbert';
import { PaginateSetorDto } from '../../dto/setor/paginate-setor.dto';

@Injectable()
export class ListarSetoresUseCase {
  constructor(private readonly repository: SetorPrismaRepository) {}

  async execute(
    props: PaginateSetorDto,
  ): Promise<PaginateResponse<SetorPrismaExtended>> {
    return this.repository.findAll(props);
  }
}
