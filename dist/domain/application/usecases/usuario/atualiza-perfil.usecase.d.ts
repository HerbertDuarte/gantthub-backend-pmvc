import { UseCase } from '@/src/core/interfaces/usecase.interface';
import { UsuarioPrismaRepository } from '../../../../infrastructure/repository/usuario-prisma.repository';
import { UpdateUsuarioValidator } from '../../validators/update-usuario.validator';
import { AtualizaPerfilUsuarioDto } from '../../dto/usuario/atualiza-perfil.dto';
import { SenhaValidaValidator } from '../../validators/senha-valida.validator';
import { Usuario } from '../../../entity/usuario';
export declare class AtualizarPerfilUsuarioUseCase implements UseCase<Usuario> {
    private readonly usuarioRepository;
    private readonly updateUsuarioValidator;
    private readonly senhaValidaValidator;
    constructor(usuarioRepository: UsuarioPrismaRepository, updateUsuarioValidator: UpdateUsuarioValidator, senhaValidaValidator: SenhaValidaValidator);
    execute(id: string, data: AtualizaPerfilUsuarioDto): Promise<void>;
}
