import { ProjetoPrismaRepository } from 'src/infrastructure/repository/projeto-prisma.repository';
export declare class ProjetoController {
    private readonly projetoPrismaRepository;
    constructor(projetoPrismaRepository: ProjetoPrismaRepository);
    getAll(): Promise<({
        usuariosProjetos: ({
            usuario: import("@prisma/client/runtime").GetResult<{
                id: string;
                nome: string;
                email: string;
                situacao: number;
                login: string;
                refreshToken: string;
                senha: string;
                imageUrl: string;
                createdAt: Date;
            }, unknown, never> & {};
        } & import("@prisma/client/runtime").GetResult<{
            tipoVinculo: number;
            usuarioId: string;
            projetoId: string;
        }, unknown, never> & {})[];
    } & import("@prisma/client/runtime").GetResult<{
        id: string;
        nome: string;
        descricao: string;
        createdAt: Date;
    }, unknown, never> & {})[]>;
    getOne(id: string): Promise<{
        marcos: ({
            tarefas: ({
                usuariosTarefas: ({
                    usuario: import("@prisma/client/runtime").GetResult<{
                        id: string;
                        nome: string;
                        email: string;
                        situacao: number;
                        login: string;
                        refreshToken: string;
                        senha: string;
                        imageUrl: string;
                        createdAt: Date;
                    }, unknown, never> & {};
                } & import("@prisma/client/runtime").GetResult<{
                    usuarioId: string;
                    tarefaId: string;
                }, unknown, never> & {})[];
                checkLists: ({
                    checkItems: (import("@prisma/client/runtime").GetResult<{
                        id: string;
                        nome: string;
                        checked: boolean;
                        createdAt: Date;
                        checkListId: string;
                    }, unknown, never> & {})[];
                } & import("@prisma/client/runtime").GetResult<{
                    id: string;
                    nome: string;
                    createdAt: Date;
                    tarefaId: string;
                }, unknown, never> & {})[];
            } & import("@prisma/client/runtime").GetResult<{
                id: string;
                nome: string;
                descricao: string;
                dataInicio: Date;
                dataFim: Date;
                status: number;
                createdAt: Date;
                marcoId: string;
            }, unknown, never> & {})[];
        } & import("@prisma/client/runtime").GetResult<{
            id: string;
            nome: string;
            projetoId: string;
        }, unknown, never> & {})[];
        usuariosProjetos: ({
            usuario: import("@prisma/client/runtime").GetResult<{
                id: string;
                nome: string;
                email: string;
                situacao: number;
                login: string;
                refreshToken: string;
                senha: string;
                imageUrl: string;
                createdAt: Date;
            }, unknown, never> & {};
        } & import("@prisma/client/runtime").GetResult<{
            tipoVinculo: number;
            usuarioId: string;
            projetoId: string;
        }, unknown, never> & {})[];
    } & import("@prisma/client/runtime").GetResult<{
        id: string;
        nome: string;
        descricao: string;
        createdAt: Date;
    }, unknown, never> & {}>;
}
