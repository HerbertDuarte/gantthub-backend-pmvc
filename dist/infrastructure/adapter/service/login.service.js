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
exports.LoginService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const crypto_1 = require("crypto");
const config_1 = require("@nestjs/config");
let LoginService = class LoginService {
    constructor(jwtService, config) {
        this.jwtService = jwtService;
        this.config = config;
    }
    async execute(request, response) {
        const usuario = request.user;
        const payload = {
            email: usuario.getEmail(),
            id: usuario.getId(),
            refreshToken: (0, crypto_1.randomUUID)(),
        };
        const usuarioId = usuario.getId();
        const accessToken = this.jwtService.sign(payload, {
            expiresIn: this.config.get('JWT_EXPIRE'),
            algorithm: 'HS256',
            privateKey: this.config.get('JWT_SECRET'),
        });
        const bearerToken = `Bearer ${accessToken}`;
        response && response.setHeader('Authorization', bearerToken);
        return {
            access_token: accessToken,
            usuarioId,
        };
    }
};
LoginService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        config_1.ConfigService])
], LoginService);
exports.LoginService = LoginService;
//# sourceMappingURL=login.service.js.map