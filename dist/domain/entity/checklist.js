"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckList = void 0;
const crypto_1 = require("crypto");
class CheckList {
    constructor(props) {
        var _a, _b;
        this.getId = () => this.id;
        this.getNome = () => this.nome;
        this.getCreatedAt = () => this.createdAt;
        this.getTarefaId = () => this.tarefaId;
        this.validate(props);
        this.id = (_a = props.id) !== null && _a !== void 0 ? _a : (0, crypto_1.randomUUID)();
        this.nome = props.nome;
        this.createdAt = (_b = props.createdAt) !== null && _b !== void 0 ? _b : new Date();
        this.tarefaId = props.tarefaId;
    }
    validate(props) {
        this.validateNome(props);
    }
    validateNome({ nome }) {
        if (nome.length === 0) {
            throw new Error('Nome é obrigatório');
        }
    }
}
exports.CheckList = CheckList;
//# sourceMappingURL=checklist.js.map