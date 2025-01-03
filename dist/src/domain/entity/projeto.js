"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Projeto = void 0;
const crypto_1 = require("crypto");
class Projeto {
    constructor(props) {
        var _a, _b;
        this.getId = () => this.id;
        this.getNome = () => this.nome;
        this.getDescricao = () => this.descricao;
        this.getCreatedAt = () => this.createdAt;
        this.validate(props);
        this.id = (_a = props.id) !== null && _a !== void 0 ? _a : (0, crypto_1.randomUUID)();
        this.nome = props.nome;
        this.descricao = props.descricao;
        this.createdAt = (_b = props.createdAt) !== null && _b !== void 0 ? _b : new Date();
    }
    validate(props) {
        this.validateNome(props.nome);
        this.validateDescricao(props.descricao);
    }
    validateNome(nome) {
        if (nome.length < 3) {
            throw new Error('Nome do projeto deve ter no mínimo 3 caracteres');
        }
    }
    validateDescricao(descricao) {
        if (descricao.length < 3) {
            throw new Error('Descrição do projeto deve ter no mínimo 3 caracteres');
        }
    }
}
exports.Projeto = Projeto;
//# sourceMappingURL=projeto.js.map