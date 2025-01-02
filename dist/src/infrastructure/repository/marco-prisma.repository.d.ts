import { PrismaService } from '../plugins/database/services/prisma.service';
import { CreateMarcoDto } from '../adapter/controller/marco.controller';
export declare class MarcoPrismaRepository {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    getAll(): Promise<(import("@prisma/client/runtime").GetResult<{
        id: string;
        nome: string;
        projetoId: string;
    }, unknown, never> & {})[]>;
    create(dto: CreateMarcoDto): Promise<import("@prisma/client/runtime").GetResult<{
        id: string;
        nome: string;
        projetoId: string;
    }, unknown, never> & {}>;
    update(id: string, dto: Partial<CreateMarcoDto>): Promise<import("@prisma/client/runtime").GetResult<{
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
