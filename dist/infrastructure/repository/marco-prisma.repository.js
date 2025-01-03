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
exports.MarcoPrismaRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../plugins/database/services/prisma.service");
let MarcoPrismaRepository = class MarcoPrismaRepository {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async getAll() {
        return this.prismaService.marcoPrisma.findMany();
    }
    async create(dto) {
        return this.prismaService.marcoPrisma.create({
            data: {
                nome: dto.nome,
                projeto: {
                    connect: {
                        id: dto.projetoId,
                    },
                },
            },
        });
    }
    async update(id, dto) {
        const data = {};
        dto.nome && (data['nome'] = dto.nome);
        return this.prismaService.marcoPrisma.update({
            where: {
                id,
            },
            data,
        });
    }
    async delete(id) {
        return this.prismaService.marcoPrisma.delete({
            where: {
                id,
            },
        });
    }
};
MarcoPrismaRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MarcoPrismaRepository);
exports.MarcoPrismaRepository = MarcoPrismaRepository;
//# sourceMappingURL=marco-prisma.repository.js.map