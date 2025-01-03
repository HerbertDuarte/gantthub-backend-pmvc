import { UseCase } from '@/src/core/interfaces/usecase.interface';
import { Usuario } from '@/src/domain/entity/usuario';
import { UsuarioPrismaRepository } from '@/src/infrastructure/repository/usuario-prisma.repository';
import { AtualizaUsuarioDto } from '../../dto/usuario/atualiza-usuario.dto';
import { SenhaValidaValidator } from '../../validators/senha-valida.validator';
import { UpdateUsuarioValidator } from '../../validators/update-usuario.validator';
export declare class AtualizarUsuarioUseCase implements UseCase<Usuario> {
    private readonly usuarioRepository;
    private readonly updateUsuarioValidator;
    private readonly senhaValidaValidator;
    constructor(usuarioRepository: UsuarioPrismaRepository, updateUsuarioValidator: UpdateUsuarioValidator, senhaValidaValidator: SenhaValidaValidator);
    execute(id: string, data: AtualizaUsuarioDto): Promise<void>;
}
