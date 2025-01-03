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
var EmailJaCadastradoValidator_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailJaCadastradoValidator = void 0;
const usuario_prisma_repository_1 = require("../../../infrastructure/repository/usuario-prisma.repository");
const common_1 = require("@nestjs/common");
let EmailJaCadastradoValidator = EmailJaCadastradoValidator_1 = class EmailJaCadastradoValidator {
    constructor(usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
        this.logger = new common_1.Logger(EmailJaCadastradoValidator_1.name);
    }
    async validate(email) {
        const emailExiste = await this.usuarioRepository.findByEmail(email);
        if (emailExiste) {
            this.logger.error('Esse e-mail já existe na base de dados');
            throw new common_1.ConflictException('Esse e-mail já existe na base de dados');
        }
    }
};
EmailJaCadastradoValidator = EmailJaCadastradoValidator_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [usuario_prisma_repository_1.UsuarioPrismaRepository])
], EmailJaCadastradoValidator);
exports.EmailJaCadastradoValidator = EmailJaCadastradoValidator;
//# sourceMappingURL=email-ja-cadastrado.validator.js.map