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
var JwtStrategy_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtStrategy = void 0;
const passport_jwt_1 = require("passport-jwt");
const passport_1 = require("@nestjs/passport");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const usuario_prisma_repository_1 = require("../../repository/usuario-prisma.repository");
let JwtStrategy = JwtStrategy_1 = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, 'jwt') {
    constructor(configService, usuarioRepository) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get('JWT_SECRET'),
        });
        this.usuarioRepository = usuarioRepository;
        this.logger = new common_1.Logger(JwtStrategy_1.name);
    }
    async validate(payload) {
        if (this.verificaExpiracao(payload)) {
            const usuario = await this.usuarioRepository.findByRefreshToken(payload.refreshToken);
            if (!usuario) {
                this.logger.error('Usuário não encontrado');
                throw new common_1.UnauthorizedException('Acesso negado');
            }
            return this.usuarioRepository.updateRefreshToken(usuario.getId());
        }
        const usuario = await this.usuarioRepository.findById(payload.id);
        if (!usuario) {
            throw new common_1.UnauthorizedException('Usuário não encontrado');
        }
        return usuario;
    }
    verificaExpiracao(payload) {
        const dataAtual = new Date().getTime();
        const dataExpiracao = new Date(payload.exp * 1000).getTime();
        return dataAtual > dataExpiracao;
    }
};
JwtStrategy = JwtStrategy_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        usuario_prisma_repository_1.UsuarioPrismaRepository])
], JwtStrategy);
exports.JwtStrategy = JwtStrategy;
//# sourceMappingURL=jwt.strategy.js.map