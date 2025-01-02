import { UsuarioPrismaRepository } from '../../../../infrastructure/repository/usuario-prisma.repository';
import { UseCase } from 'src/core/interfaces/usecase.interface';
import { Usuario } from 'src/domain/entity/usuario';
export declare class DeletarUsuarioUseCase implements UseCase<Usuario> {
    private readonly usuarioRepository;
    private readonly logger;
    constructor(usuarioRepository: UsuarioPrismaRepository);
    execute(id: string): Promise<void>;
}
