"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var SenhaValidaValidator_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SenhaValidaValidator = void 0;
const common_1 = require("@nestjs/common");
const lib_test_herbert_1 = require("lib-test-herbert");
let SenhaValidaValidator = SenhaValidaValidator_1 = class SenhaValidaValidator {
    constructor() {
        this.logger = new common_1.Logger(SenhaValidaValidator_1.name);
    }
    async validate(usuario, { senhaAntiga, senhaNova }) {
        if (senhaNova) {
            if (!senhaAntiga) {
                throw new common_1.ConflictException('É necessário passar a senha antiga para atualizar a senha.');
            }
            const senhaCorreta = await lib_test_herbert_1.HashUtils.comparaString(senhaAntiga, usuario.getSenha());
            if (!senhaCorreta) {
                this.logger.error('Senha antiga incorreta ao tentar atualizar usuário.');
                throw new common_1.ConflictException('Senha  antiga incorreta.');
            }
        }
    }
};
SenhaValidaValidator = SenhaValidaValidator_1 = __decorate([
    (0, common_1.Injectable)()
], SenhaValidaValidator);
exports.SenhaValidaValidator = SenhaValidaValidator;
//# sourceMappingURL=senha-valida.validator.js.map