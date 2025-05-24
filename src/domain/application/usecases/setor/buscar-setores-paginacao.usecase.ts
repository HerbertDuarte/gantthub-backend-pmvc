import { Injectable } from '@nestjs/common';
import { UseCase } from '@/src/core/interfaces/usecase.interface';
import { SetorPrisma } from '@prisma/client';
import { PaginateResponse } from 'lib-test-herbert';
import { PaginateSetorDto } from '../../dto/setor/paginate-setor.dto';
import { SetorPrismaRepository } from '@/src/infrastructure/repository/setor-prisma.repository';

@Injectable()
export class BuscarSetoresPaginacaoUseCase
  implements UseCase<PaginateResponse<SetorPrisma>>
{
  constructor(private readonly setorRepository: SetorPrismaRepository) {}

  async execute(
    props?: PaginateSetorDto,
  ): Promise<PaginateResponse<SetorPrisma>> {
    return this.setorRepository.findAll(props);
  }
}
