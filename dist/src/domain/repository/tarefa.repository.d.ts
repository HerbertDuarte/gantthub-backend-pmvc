import { Tarefa } from '../entity/tarefa';
export interface ITarefaRepository {
    getAll(projetoId: string): Promise<Tarefa[]>;
    getById(id: string): Promise<Tarefa>;
    create(data: Tarefa): Promise<Tarefa>;
    update(data: Tarefa): Promise<Tarefa>;
    delete(id: string): Promise<void>;
}
