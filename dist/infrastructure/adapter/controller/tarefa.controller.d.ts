import { TarefaStatusEnum } from '@/src/domain/enum/tarefa-status.enum';
import { TarefaPrismaRepository } from '@/src/infrastructure/repository/tarefa-prisma.repository';
export type CreateTarefaDto = {
    nome: string;
    descricao?: string;
    dataInicio: Date;
    dataFim: Date;
    marcoId: string;
};
export type UpdateTarefaDto = {
    descricao: string;
    nome: string;
    status: TarefaStatusEnum;
};
export declare class TarefaController {
    private readonly tarefaPrismaRepository;
    constructor(tarefaPrismaRepository: TarefaPrismaRepository);
    getAll(body: CreateTarefaDto): Promise<import("@prisma/client/runtime").GetResult<{
        id: string;
        nome: string;
        descricao: string;
        dataInicio: Date;
        dataFim: Date;
        status: number;
        createdAt: Date;
        marcoId: string;
    }, unknown, never> & {}>;
    updateDescription(id: string, body: Partial<UpdateTarefaDto>): Promise<import("@prisma/client/runtime").GetResult<{
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
