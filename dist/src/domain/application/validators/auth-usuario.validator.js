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
exports.AuthUsuarioValidator = void 0;
const common_1 = require("@nestjs/common");
const lib_test_herbert_1 = require("lib-test-herbert");
const usuario_prisma_repository_1 = require("../../../infrastructure/repository/usuario-prisma.repository");
const usuario_situacao_enum_1 = require("../../enum/usuario-situacao.enum");
let AuthUsuarioValidator = class AuthUsuarioValidator {
    constructor(logger, usuarioRepository) {
        this.logger = logger;
        this.usuarioRepository = usuarioRepository;
    }
    async validate({ email, senha }) {
        const usuario = await this.usuarioRepository.findByEmail(email);
        if (usuario) {
            const situacao = usuario.getSituacao();
            const matched = await lib_test_herbert_1.HashUtils.comparaString(senha, usuario.getSenha());
            const canContinue = situacao === usuario_situacao_enum_1.EnumSituacaoUsuario.ATIVO && matched;
            if (canContinue) {
                return usuario;
            }
            this.logger.error('Senha inválida ou usuário inativo');
            return null;
        }
        this.logger.error('Usuário inválido!');
        return null;
    }
};
AuthUsuarioValidator = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [common_1.Logger,
        usuario_prisma_repository_1.UsuarioPrismaRepository])
], AuthUsuarioValidator);
exports.AuthUsuarioValidator = AuthUsuarioValidator;
//# sourceMappingURL=auth-usuario.validator.js.map