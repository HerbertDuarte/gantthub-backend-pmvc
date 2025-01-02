import { PrismaService } from '../plugins/database/services/prisma.service';
import { CreateTarefaDto, UpdateTarefaDto } from '../adapter/controller/tarefa.controller';
export declare class TarefaPrismaRepository {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    getAll(): Promise<(import("@prisma/client/runtime").GetResult<{
        id: string;
        nome: string;
        descricao: string;
        dataInicio: Date;
        dataFim: Date;
        status: number;
        createdAt: Date;
        marcoId: string;
    }, unknown, never> & {})[]>;
    create(dto: CreateTarefaDto): Promise<import("@prisma/client/runtime").GetResult<{
        id: string;
        nome: string;
        descricao: string;
        dataInicio: Date;
        dataFim: Date;
        status: number;
        createdAt: Date;
        marcoId: string;
    }, unknown, never> & {}>;
    update(id: string, dto: Partial<UpdateTarefaDto>): Promise<import("@prisma/client/runtime").GetResult<{
        id: string;
        nome: string;
        descricao: string;
        dataInicio: Date;
        dataFim: Date;
        status: number;
        createdAt: Date;
        marcoId: string;
    }, unknown, never> & {}>;
    delete(id: string): Promise<import("@prisma/client/runtime").GetResult<{
        id: string;
        nome: string;
        descricao: string;
        dataInicio: Date;
        dataFim: Date;
        status: number;
        createdAt: Date;
        marcoId: string;
    }, unknown, never> & {}>;
}
