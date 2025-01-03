import { MarcoPrismaRepository } from '@/src/infrastructure/repository/marco-prisma.repository';
export type CreateMarcoDto = {
    nome: string;
    projetoId: string;
};
export declare class MarcoController {
    private readonly marcoPrismaRepository;
    constructor(marcoPrismaRepository: MarcoPrismaRepository);
    getAll(body: CreateMarcoDto): Promise<import("@prisma/client/runtime").GetResult<{
        id: string;
        nome: string;
        projetoId: string;
    }, unknown, never> & {}>;
    updateDescription(id: string, body: Partial<CreateMarcoDto>): Promise<import("@prisma/client/runtime").GetResult<{
        id: string;
        nome: string;
        projetoId: string;
    }, unknown, never> & {}>;
    delete(id: string): Promise<import("@prisma/client/runtime").GetResult<{
        id: string;
        nome: string;
        projetoId: string;
    }, unknown, never> & {}>;
}
