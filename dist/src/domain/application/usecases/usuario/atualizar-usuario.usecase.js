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
exports.AtualizarUsuarioUseCase = void 0;
const common_1 = require("@nestjs/common");
const lib_test_herbert_1 = require("lib-test-herbert");
const usuario_1 = require("../../../entity/usuario");
const usuario_prisma_repository_1 = require("../../../../infrastructure/repository/usuario-prisma.repository");
const senha_valida_validator_1 = require("../../validators/senha-valida.validator");
const update_usuario_validator_1 = require("../../validators/update-usuario.validator");
let AtualizarUsuarioUseCase = class AtualizarUsuarioUseCase {
    constructor(usuarioRepository, updateUsuarioValidator, senhaValidaValidator) {
        this.usuarioRepository = usuarioRepository;
        this.updateUsuarioValidator = updateUsuarioValidator;
        this.senhaValidaValidator = senhaValidaValidator;
    }
    async execute(id, data) {
        const usuarioExists = await this.usuarioRepository.findById(id);
        if (!usuarioExists)
            throw new common_1.ConflictException('Usuário não encontrado.');
        const atualizaUsuarioPayload = data;
        const atualizaSenha = data.senhaNova;
        if (atualizaSenha) {
            await this.senhaValidaValidator.validate(usuarioExists, data);
            atualizaUsuarioPayload.senha = await lib_test_herbert_1.HashUtils.hashString(data.senhaNova);
        }
        await this.updateUsuarioValidator.validate(usuarioExists, atualizaUsuarioPayload);
        const usuario = new usuario_1.Usuario(Object.assign({ id: usuarioExists.getId(), email: usuarioExists.getEmail(), nome: usuarioExists.getNome(), login: usuarioExists.getLogin(), createdAt: usuarioExists.getCreatedAt(), senha: usuarioExists.getSenha(), situacao: usuarioExists.getSituacao() }, atualizaUsuarioPayload));
        await this.usuarioRepository.atualiza(id, usuario);
    }
};
AtualizarUsuarioUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [usuario_prisma_repository_1.UsuarioPrismaRepository,
        update_usuario_validator_1.UpdateUsuarioValidator,
        senha_valida_validator_1.SenhaValidaValidator])
], AtualizarUsuarioUseCase);
exports.AtualizarUsuarioUseCase = AtualizarUsuarioUseCase;
//# sourceMappingURL=atualizar-usuario.usecase.js.map