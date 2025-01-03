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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const login_service_1 = require("../service/login.service");
const autentica_usuario_dto_1 = require("../../../domain/application/dto/auth/autentica-usuario.dto");
const local_auth_guard_1 = require("../guard/local-auth.guard");
let AuthController = class AuthController {
    constructor(logger, loginService) {
        this.logger = logger;
        this.loginService = loginService;
    }
    async login(req) {
        this.logger.debug('Login realizado no sistema!');
        return this.loginService.execute(req);
    }
};
__decorate([
    (0, common_1.UseGuards)(local_auth_guard_1.LocalAuthGuard),
    (0, common_1.Post)('login'),
    (0, swagger_1.ApiBody)({
        description: 'Dados para login',
        type: autentica_usuario_dto_1.AutenticaUsuarioDto,
    }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    (0, swagger_1.ApiTags)('Autenticação'),
    __metadata("design:paramtypes", [common_1.Logger,
        login_service_1.LoginService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map