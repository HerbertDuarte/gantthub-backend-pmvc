import { CriaUsuarioDto } from '../../../domain/application/dto/usuario/cria-usuario.dto';
import { CriarUsuarioUseCase } from '../../../domain/application/usecases/usuario/criar-usuario.usecase';
import { DeletarUsuarioUseCase } from '../../../domain/application/usecases/usuario/deletar-usuario.usecase';
import { PaginateUsuarioDto } from '../../../domain/application/dto/usuario/paginate-usuario.dto';
import { AtualizaPerfilUsuarioDto } from '../../../domain/application/dto/usuario/atualiza-perfil.dto';
import { AtualizarPerfilUsuarioUseCase } from '../../../domain/application/usecases/usuario/atualiza-perfil.usecase';
import { Request } from 'express';
import { Usuario } from '../../../domain/entity/usuario';
import { AtualizarUsuarioUseCase } from 'src/domain/application/usecases/usuario/atualizar-usuario.usecase';
import { BuscarPorIdUsuarioUseCase } from 'src/domain/application/usecases/usuario/buscar-por-id-usuario.usecase';
import { BuscarUsuariosPaginacaoUseCase } from 'src/domain/application/usecases/usuario/buscar-usuarios-paginacao.usecase';
export declare class UsuarioController {
    private readonly criarUsuarioUseCase;
    private readonly atualizarUsuarioUseCase;
    private readonly buscarPorIdUsuarioUseCase;
    private readonly buscarUsuariosPaginacaoUseCase;
    private readonly deletarUsuarioUseCase;
    private readonly atualizaPerfilUsuarioUseCase;
    constructor(criarUsuarioUseCase: CriarUsuarioUseCase, atualizarUsuarioUseCase: AtualizarUsuarioUseCase, buscarPorIdUsuarioUseCase: BuscarPorIdUsuarioUseCase, buscarUsuariosPaginacaoUseCase: BuscarUsuariosPaginacaoUseCase, deletarUsuarioUseCase: DeletarUsuarioUseCase, atualizaPerfilUsuarioUseCase: AtualizarPerfilUsuarioUseCase);
    cria(dados: CriaUsuarioDto): Promise<Usuario>;
    findAll(queryPrams?: PaginateUsuarioDto): Promise<import("lib-test-herbert").PaginateResponse<Usuario>>;
    findById(id: string): Promise<Usuario>;
    getPerfil(req: Request): Promise<Usuario>;
    atualizaPerfil(data: AtualizaPerfilUsuarioDto, req: Request): Promise<void>;
}
