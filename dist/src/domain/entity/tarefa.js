"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tarefa = void 0;
const crypto_1 = require("crypto");
const tarefa_status_enum_1 = require("../enum/tarefa-status.enum");
class Tarefa {
    constructor(props) {
        var _a, _b, _c, _d;
        this.getId = () => this.id;
        this.getNome = () => this.nome;
        this.getDescricao = () => this.descricao;
        this.getDataInicio = () => this.dataInicio;
        this.getDataFim = () => this.dataFim;
        this.getStatus = () => this.status;
        this.getCreatedAt = () => this.createdAt;
        this.getUpdatedAt = () => this.updatedAt;
        this.getEmAtraso = () => this.emAtraso;
        this.getmarcoId = () => this.marcoId;
        this.validate(props);
        this.id = (_a = props.id) !== null && _a !== void 0 ? _a : (0, crypto_1.randomUUID)();
        this.nome = props.nome;
        this.descricao = props.descricao;
        this.dataInicio = props.dataInicio;
        this.dataFim = props.dataFim;
        this.status = (_b = props.status) !== null && _b !== void 0 ? _b : tarefa_status_enum_1.TarefaStatusEnum.NAO_INICIADA;
        this.createdAt = (_c = props.createdAt) !== null && _c !== void 0 ? _c : new Date();
        this.updatedAt = (_d = props.updatedAt) !== null && _d !== void 0 ? _d : null;
        this.marcoId = props.marcoId;
        this.emAtraso = this.isEmAtraso(props);
    }
    validate(props) {
        this.validateDataFim(props);
    }
    validateDataFim({ dataFim, dataInicio }) {
        if (dataFim < dataInicio) {
            throw new Error('Data de fim não pode ser menor que a data de início');
        }
    }
    isEmAtraso({ dataFim, status }) {
        const statusPermitidos = [
            tarefa_status_enum_1.TarefaStatusEnum.CONCLUIDA,
            tarefa_status_enum_1.TarefaStatusEnum.CONCLUIDA_COM_ATRASO,
        ];
        if (statusPermitidos.includes(status)) {
            return false;
        }
        return dataFim < new Date();
    }
    atualizarStatus(status) {
        if (status === tarefa_status_enum_1.TarefaStatusEnum.NAO_INICIADA) {
            this.parar();
        }
        if (status === tarefa_status_enum_1.TarefaStatusEnum.EM_ANDAMENTO) {
            this.iniciar();
        }
        if (status === tarefa_status_enum_1.TarefaStatusEnum.CONCLUIDA) {
            this.concluir();
        }
        if (status === tarefa_status_enum_1.TarefaStatusEnum.PENDENTE) {
            this.adicionarPendencia();
        }
    }
    parar() {
        this.status = tarefa_status_enum_1.TarefaStatusEnum.PENDENTE;
        this.touch();
    }
    concluir() {
        this.status = this.emAtraso
            ? tarefa_status_enum_1.TarefaStatusEnum.CONCLUIDA_COM_ATRASO
            : tarefa_status_enum_1.TarefaStatusEnum.CONCLUIDA;
        this.touch();
    }
    iniciar() {
        this.status = tarefa_status_enum_1.TarefaStatusEnum.EM_ANDAMENTO;
        this.touch();
    }
    adicionarPendencia() {
        this.status = tarefa_status_enum_1.TarefaStatusEnum.PENDENTE;
        this.touch();
    }
    touch() {
        this.updatedAt = new Date();
    }
}
exports.Tarefa = Tarefa;
//# sourceMappingURL=tarefa.js.map