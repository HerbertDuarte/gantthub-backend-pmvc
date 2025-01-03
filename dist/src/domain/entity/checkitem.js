"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckItem = void 0;
const crypto_1 = require("crypto");
class CheckItem {
    constructor(props) {
        var _a, _b, _c;
        this.getId = () => this.id;
        this.getNome = () => this.nome;
        this.getChecked = () => this.checked;
        this.getCreatedAt = () => this.createdAt;
        this.getCheckListId = () => this.checkListId;
        this.validate(props);
        this.id = (_a = props.id) !== null && _a !== void 0 ? _a : (0, crypto_1.randomUUID)();
        this.nome = props.nome;
        this.checked = (_b = props.checked) !== null && _b !== void 0 ? _b : false;
        this.createdAt = (_c = props.createdAt) !== null && _c !== void 0 ? _c : new Date();
        this.checkListId = props.checkListId;
    }
    validate(props) {
        this.validateNome(props);
    }
    validateNome({ nome }) {
        if (nome.length === 0) {
            throw new Error('Nome é obrigatório');
        }
    }
    check() {
        this.checked = true;
    }
    uncheck() {
        this.checked = false;
    }
    updateName(nome) {
        this.nome = nome;
    }
}
exports.CheckItem = CheckItem;
//# sourceMappingURL=checkitem.js.map