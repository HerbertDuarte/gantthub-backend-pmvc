"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = void 0;
const crypto_1 = require("crypto");
const usuario_situacao_enum_1 = require("../enum/usuario-situacao.enum");
const is_hash_1 = require("../../lib/string/is-hash");
const bcryptjs_1 = require("bcryptjs");
const is_email_1 = require("../../lib/string/is-email");
const has_symbols_1 = require("../../lib/string/has-symbols");
const has_uppercase_1 = require("../../lib/string/has-uppercase");
const has_lower_case_1 = require("../../lib/string/has-lower-case");
const has_number_1 = require("../../lib/string/has-number");
class Usuario {
    constructor(props) {
        var _a, _b, _c, _d;
        this.getId = () => this.id;
        this.getNome = () => this.nome;
        this.getEmail = () => this.email;
        this.getSituacao = () => this.situacao;
        this.getLogin = () => this.login;
        this.getSenha = () => this.senha;
        this.getCreatedAt = () => this.createdAt;
        this.getImageUrl = () => this.imageUrl;
        this.validate(props);
        this.imageUrl = (_a = props.imageUrl) !== null && _a !== void 0 ? _a : null;
        this.id = (_b = props.id) !== null && _b !== void 0 ? _b : (0, crypto_1.randomUUID)();
        this.nome = props.nome;
        this.email = props.email;
        this.situacao = (_c = props.situacao) !== null && _c !== void 0 ? _c : usuario_situacao_enum_1.EnumSituacaoUsuario.ATIVO;
        this.login = props.login;
        this.setSenha(props.senha);
        this.createdAt = (_d = props.createdAt) !== null && _d !== void 0 ? _d : new Date();
    }
    setSenha(senha) {
        if ((0, is_hash_1.isHash)(senha)) {
            this.senha = senha;
            return;
        }
        this.senha = (0, bcryptjs_1.hashSync)(senha);
    }
    validate(props) {
        this.validateEmail(props.email);
        this.validateLogin(props.login);
        this.validatePassword(props.senha);
    }
    validatePassword(senha) {
        if (senha.length < 8) {
            throw new Error('Senha deve ter no mínimo 8 caracteres.');
        }
        if (!(0, has_symbols_1.hasSymbols)(senha)) {
            throw new Error('Senha deve conter caracteres especiais.');
        }
        if (!(0, has_uppercase_1.hasUppercase)(senha)) {
            throw new Error('Senha deve conter pelo menos uma letra maiúscula.');
        }
        if (!(0, has_lower_case_1.hasLowercase)(senha)) {
            throw new Error('Senha deve conter pelo menos uma letra minúscula.');
        }
        if (!(0, has_number_1.hasNumber)(senha)) {
            throw new Error('Senha deve conter pelo menos um número.');
        }
    }
    validateEmail(email) {
        if (!(0, is_email_1.isEmail)(email)) {
            throw new Error('Email inválido.');
        }
    }
    validateLogin(login) {
        if ((0, has_symbols_1.hasSymbols)(login)) {
            throw new Error('Login não pode conter caracteres especiais.');
        }
        if (login.length < 4) {
            throw new Error('Login deve ter no mínimo 4 caracteres.');
        }
    }
}
exports.Usuario = Usuario;
//# sourceMappingURL=usuario.js.map