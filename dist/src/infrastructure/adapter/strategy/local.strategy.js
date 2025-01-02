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
exports.LocalStrategy = void 0;
const passport_local_1 = require("passport-local");
const passport_1 = require("@nestjs/passport");
const common_1 = require("@nestjs/common");
const auth_usuario_validator_1 = require("../../../domain/application/validators/auth-usuario.validator");
const usuario_prisma_repository_1 = require("../../repository/usuario-prisma.repository");
let LocalStrategy = class LocalStrategy extends (0, passport_1.PassportStrategy)(passport_local_1.Strategy, 'local') {
    constructor(authUsuarioValidator, usuarioRepository) {
        super({
            usernameField: 'email',
        });
        this.authUsuarioValidator = authUsuarioValidator;
        this.usuarioRepository = usuarioRepository;
    }
    async validate(email, senha) {
        const usuario = await this.authUsuarioValidator.validate({ email, senha });
        if (!usuario) {
            throw new common_1.UnauthorizedException('Usuário ou senha inválidos!');
        }
        const usuarioLogado = await this.usuarioRepository.updateRefreshToken(usuario.getId());
        return usuarioLogado;
    }
};
LocalStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_usuario_validator_1.AuthUsuarioValidator,
        usuario_prisma_repository_1.UsuarioPrismaRepository])
], LocalStrategy);
exports.LocalStrategy = LocalStrategy;
//# sourceMappingURL=local.strategy.js.map