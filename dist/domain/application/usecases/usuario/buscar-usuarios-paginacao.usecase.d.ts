import { PaginateResponse } from 'lib-test-herbert';
import { UseCase } from '@/src/core/interfaces/usecase.interface';
import { Usuario } from '@/src/domain/entity/usuario';
import { UsuarioPrismaRepository } from '@/src/infrastructure/repository/usuario-prisma.repository';
import { PaginateUsuarioDto } from '../../dto/usuario/paginate-usuario.dto';
export declare class BuscarUsuariosPaginacaoUseCase implements UseCase<Usuario> {
    private readonly usuarioRepository;
    constructor(usuarioRepository: UsuarioPrismaRepository);
    execute(queryPrams: PaginateUsuarioDto): Promise<PaginateResponse<Usuario>>;
}
