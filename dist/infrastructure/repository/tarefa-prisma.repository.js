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
exports.TarefaPrismaRepository = void 0;
const common_1 = require("@nestjs/common");
const tarefa_status_enum_1 = require("../../domain/enum/tarefa-status.enum");
const prisma_service_1 = require("../plugins/database/services/prisma.service");
let TarefaPrismaRepository = class TarefaPrismaRepository {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async getAll() {
        return this.prismaService.tarefaPrisma.findMany();
    }
    async create(dto) {
        var _a;
        return this.prismaService.tarefaPrisma.create({
            data: {
                nome: dto.nome,
                descricao: (_a = dto.descricao) !== null && _a !== void 0 ? _a : '',
                dataInicio: dto.dataInicio,
                dataFim: dto.dataFim,
                status: tarefa_status_enum_1.TarefaStatusEnum.NAO_INICIADA,
                marco: {
                    connect: {
                        id: dto.marcoId,
                    },
                },
            },
        });
    }
    async update(id, dto) {
        const data = {};
        dto.nome && (data['nome'] = dto.nome);
        dto.descricao && (data['descricao'] = dto.descricao);
        dto.status !== undefined && (data['status'] = dto.status);
        return this.prismaService.tarefaPrisma.update({
            where: {
                id,
            },
            data,
        });
    }
    async delete(id) {
        return this.prismaService.tarefaPrisma.delete({
            where: {
                id,
            },
        });
    }
};
TarefaPrismaRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TarefaPrismaRepository);
exports.TarefaPrismaRepository = TarefaPrismaRepository;
//# sourceMappingURL=tarefa-prisma.repository.js.map