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
exports.UsuarioPrismaRepository = void 0;
const prisma_service_1 = require("../plugins/database/services/prisma.service");
const common_1 = require("@nestjs/common");
const lib_test_herbert_1 = require("lib-test-herbert");
const usuario_mapper_1 = require("../mapper/usuario.mapper");
const crypto_1 = require("crypto");
let UsuarioPrismaRepository = class UsuarioPrismaRepository {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async cria(usuario) {
        await this.prismaService.usuarioPrisma.create({
            data: usuario_mapper_1.UsuarioMapper.toPersistence(usuario),
        });
        return usuario;
    }
    async findAll(props) {
        const { busca, pagina, itensPorPagina } = props;
        const paginateUtil = new lib_test_herbert_1.PaginateUtil(this.prismaService);
        return paginateUtil.execute({
            module: 'usuarioPrisma',
            busca,
            pagina,
            itensPorPagina,
        });
    }
    async findByEmail(email) {
        const usuario = await this.prismaService.usuarioPrisma.findUnique({
            where: {
                email,
            },
        });
        return usuario_mapper_1.UsuarioMapper.toDomain(usuario);
    }
    async findById(id) {
        const usuario = await this.prismaService.usuarioPrisma.findUnique({
            where: {
                id,
            },
        });
        return usuario_mapper_1.UsuarioMapper.toDomain(usuario);
    }
    async findByLogin(login) {
        const usuario = await this.prismaService.usuarioPrisma.findUnique({
            where: {
                login: login,
            },
        });
        return usuario_mapper_1.UsuarioMapper.toDomain(usuario);
    }
    async findBySenha(senha) {
        const usuario = await this.prismaService.usuarioPrisma.findFirst({
            where: {
                senha,
            },
        });
        return usuario_mapper_1.UsuarioMapper.toDomain(usuario);
    }
    async findByRefreshToken(refreshToken) {
        const usuario = await this.prismaService.usuarioPrisma.findFirst({
            where: {
                refreshToken,
            },
        });
        return usuario_mapper_1.UsuarioMapper.toDomain(usuario);
    }
    async updateRefreshToken(usuarioId) {
        const usuario = await this.findById(usuarioId);
        if (!usuario)
            return null;
        const newToken = (0, crypto_1.randomUUID)();
        const usuarioPrisma = await this.prismaService.usuarioPrisma.update({
            where: {
                id: usuarioId,
            },
            data: {
                refreshToken: newToken,
            },
        });
        return usuario_mapper_1.UsuarioMapper.toDomain(usuarioPrisma);
    }
    async atualiza(id, entity) {
        const usuario = await this.prismaService.usuarioPrisma.update({
            where: {
                id,
            },
            data: usuario_mapper_1.UsuarioMapper.toPersistence(entity),
        });
        return usuario_mapper_1.UsuarioMapper.toDomain(usuario);
    }
    async deleta(id) {
        await this.prismaService.usuarioPrisma.delete({
            where: {
                id,
            },
        });
        return;
    }
};
UsuarioPrismaRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsuarioPrismaRepository);
exports.UsuarioPrismaRepository = UsuarioPrismaRepository;
//# sourceMappingURL=usuario-prisma.repository.js.map