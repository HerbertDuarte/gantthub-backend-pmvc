import { PrismaService } from '@/src/infrastructure/plugins/database/services/prisma.service';
import { PaginateResponse } from 'lib-test-herbert';
import { PaginateUsuarioDto } from '../../domain/application/dto/usuario/paginate-usuario.dto';
import { IUsuarioRepository } from '../../domain/repository/usuario.respository';
import { Usuario } from '../../domain/entity/usuario';
export declare class UsuarioPrismaRepository implements IUsuarioRepository {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    cria(usuario: Usuario): Promise<Usuario>;
    findAll(props: PaginateUsuarioDto): Promise<PaginateResponse<Usuario>>;
    findByEmail(email: string): Promise<Usuario>;
    findById(id: string): Promise<Usuario>;
    findByLogin(login: string): Promise<Usuario>;
    findBySenha(senha: string): Promise<Usuario>;
    findByRefreshToken(refreshToken: string): Promise<Usuario>;
    updateRefreshToken(usuarioId: string): Promise<Usuario>;
    atualiza(id: string, entity: Usuario): Promise<Usuario>;
    deleta(id: string): Promise<void | any>;
}
