"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CriarUsuarioUseCase = void 0;
const common_1 = require("@nestjs/common");
const usuario_prisma_repository_1 = require("../../../../infrastructure/repository/usuario-prisma.repository");
const email_ja_cadastrado_validator_1 = require("../../validators/email-ja-cadastrado.validator");
const login_ja_cadastrado_validator_1 = require("../../validators/login-ja-cadastrado.validator");
const usuario_1 = require("../../../entity/usuario");
let CriarUsuarioUseCase = class CriarUsuarioUseCase {
    constructor(usuarioRepository, emailJaCadastradoValidator, loginJaCadastradoValidator) {
        this.usuarioRepository = usuarioRepository;
        this.emailJaCadastradoValidator = emailJaCadastradoValidator;
        this.loginJaCadastradoValidator = loginJaCadastradoValidator;
    }
    async execute(data) {
        await this.loginJaCadastradoValidator.validate(data.login);
        await this.emailJaCadastradoValidator.validate(data.email);
        const usuario = new usuario_1.Usuario({
            email: data.email,
            login: data.login,
            nome: data.nome,
            senha: data.senha,
        });
        return this.usuarioRepository.cria(usuario);
    }
};
CriarUsuarioUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [usuario_prisma_repository_1.UsuarioPrismaRepository,
        email_ja_cadastrado_validator_1.EmailJaCadastradoValidator,
        login_ja_cadastrado_validator_1.LoginJaCadastradoValidator])
], CriarUsuarioUseCase);
exports.CriarUsuarioUseCase = CriarUsuarioUseCase;
//# sourceMappingURL=criar-usuario.usecase.js.map