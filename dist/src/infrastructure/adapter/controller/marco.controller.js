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
exports.MarcoController = void 0;
const common_1 = require("@nestjs/common");
const marco_prisma_repository_1 = require("../../repository/marco-prisma.repository");
let MarcoController = class MarcoController {
    constructor(marcoPrismaRepository) {
        this.marcoPrismaRepository = marcoPrismaRepository;
    }
    getAll(body) {
        return this.marcoPrismaRepository.create(body);
    }
    updateDescription(id, body) {
        return this.marcoPrismaRepository.update(id, body);
    }
    delete(id) {
        return this.marcoPrismaRepository.delete(id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MarcoController.prototype, "getAll", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], MarcoController.prototype, "updateDescription", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MarcoController.prototype, "delete", null);
MarcoController = __decorate([
    (0, common_1.Controller)('marco'),
    __metadata("design:paramtypes", [marco_prisma_repository_1.MarcoPrismaRepository])
], MarcoController);
exports.MarcoController = MarcoController;
//# sourceMappingURL=marco.controller.js.map