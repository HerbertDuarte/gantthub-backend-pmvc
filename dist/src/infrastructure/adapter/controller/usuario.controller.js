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
exports.UsuarioController = void 0;
const common_1 = require("@nestjs/common");
const cria_usuario_dto_1 = require("../../../domain/application/dto/usuario/cria-usuario.dto");
const swagger_1 = require("@nestjs/swagger");
const criar_usuario_usecase_1 = require("../../../domain/application/usecases/usuario/criar-usuario.usecase");
const deletar_usuario_usecase_1 = require("../../../domain/application/usecases/usuario/deletar-usuario.usecase");
const paginate_usuario_dto_1 = require("../../../domain/application/dto/usuario/paginate-usuario.dto");
const atualiza_perfil_dto_1 = require("../../../domain/application/dto/usuario/atualiza-perfil.dto");
const atualiza_perfil_usecase_1 = require("../../../domain/application/usecases/usuario/atualiza-perfil.usecase");
const atualizar_usuario_usecase_1 = require("../../../domain/application/usecases/usuario/atualizar-usuario.usecase");
const buscar_por_id_usuario_usecase_1 = require("../../../domain/application/usecases/usuario/buscar-por-id-usuario.usecase");
const buscar_usuarios_paginacao_usecase_1 = require("../../../domain/application/usecases/usuario/buscar-usuarios-paginacao.usecase");
const jwt_auth_guard_1 = require("../guard/jwt-auth.guard");
let UsuarioController = class UsuarioController {
    constructor(criarUsuarioUseCase, atualizarUsuarioUseCase, buscarPorIdUsuarioUseCase, buscarUsuariosPaginacaoUseCase, deletarUsuarioUseCase, atualizaPerfilUsuarioUseCase) {
        this.criarUsuarioUseCase = criarUsuarioUseCase;
        this.atualizarUsuarioUseCase = atualizarUsuarioUseCase;
        this.buscarPorIdUsuarioUseCase = buscarPorIdUsuarioUseCase;
        this.buscarUsuariosPaginacaoUseCase = buscarUsuariosPaginacaoUseCase;
        this.deletarUsuarioUseCase = deletarUsuarioUseCase;
        this.atualizaPerfilUsuarioUseCase = atualizaPerfilUsuarioUseCase;
    }
    async cria(dados) {
        return this.criarUsuarioUseCase.execute(dados);
    }
    async findAll(queryPrams) {
        return this.buscarUsuariosPaginacaoUseCase.execute(queryPrams);
    }
    async findById(id) {
        return this.buscarPorIdUsuarioUseCase.execute(id);
    }
    async getPerfil(req) {
        const userId = req.user.getId();
        return this.buscarPorIdUsuarioUseCase.execute(userId);
    }
    async atualizaPerfil(data, req) {
        const userId = req.user.getId();
        return this.atualizaPerfilUsuarioUseCase.execute(userId, data);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cria_usuario_dto_1.CriaUsuarioDto]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "cria", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [paginate_usuario_dto_1.PaginateUsuarioDto]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "findById", null);
__decorate([
    (0, common_1.Get)('/perfil'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "getPerfil", null);
__decorate([
    (0, common_1.Put)('/perfil'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [atualiza_perfil_dto_1.AtualizaPerfilUsuarioDto, Object]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "atualizaPerfil", null);
UsuarioController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('usuarios'),
    (0, swagger_1.ApiTags)('Usuários'),
    __metadata("design:paramtypes", [criar_usuario_usecase_1.CriarUsuarioUseCase,
        atualizar_usuario_usecase_1.AtualizarUsuarioUseCase,
        buscar_por_id_usuario_usecase_1.BuscarPorIdUsuarioUseCase,
        buscar_usuarios_paginacao_usecase_1.BuscarUsuariosPaginacaoUseCase,
        deletar_usuario_usecase_1.DeletarUsuarioUseCase,
        atualiza_perfil_usecase_1.AtualizarPerfilUsuarioUseCase])
], UsuarioController);
exports.UsuarioController = UsuarioController;
//# sourceMappingURL=usuario.controller.js.map