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
var DeletarUsuarioUseCase_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeletarUsuarioUseCase = void 0;
const common_1 = require("@nestjs/common");
const usuario_prisma_repository_1 = require("../../../../infrastructure/repository/usuario-prisma.repository");
let DeletarUsuarioUseCase = DeletarUsuarioUseCase_1 = class DeletarUsuarioUseCase {
    constructor(usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
        this.logger = new common_1.Logger(DeletarUsuarioUseCase_1.name);
    }
    async execute(id) {
        const usuarioExists = await this.usuarioRepository.findById(id);
        if (!usuarioExists) {
            this.logger.error('usuario não existe!');
            throw new common_1.NotFoundException('usuario não existe!');
        }
        await this.usuarioRepository.deleta(id);
    }
};
DeletarUsuarioUseCase = DeletarUsuarioUseCase_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [usuario_prisma_repository_1.UsuarioPrismaRepository])
], DeletarUsuarioUseCase);
exports.DeletarUsuarioUseCase = DeletarUsuarioUseCase;
//# sourceMappingURL=deletar-usuario.usecase.js.map