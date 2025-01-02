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
var UpdateUsuarioValidator_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUsuarioValidator = void 0;
const common_1 = require("@nestjs/common");
const email_ja_cadastrado_validator_1 = require("./email-ja-cadastrado.validator");
const login_ja_cadastrado_validator_1 = require("./login-ja-cadastrado.validator");
let UpdateUsuarioValidator = UpdateUsuarioValidator_1 = class UpdateUsuarioValidator {
    constructor(emailJaCadastradoValidator, loginJaCadastradoValidator) {
        this.emailJaCadastradoValidator = emailJaCadastradoValidator;
        this.loginJaCadastradoValidator = loginJaCadastradoValidator;
        this.logger = new common_1.Logger(UpdateUsuarioValidator_1.name);
    }
    async validate(usuario, data) {
        if (!usuario) {
            this.logger.error('Usuario não existe.');
            throw new common_1.NotFoundException('Usuario não existe');
        }
        if (usuario.getEmail() !== data.email) {
            await this.emailJaCadastradoValidator.validate(data.email);
        }
        if (usuario.getLogin() !== data.login) {
            await this.loginJaCadastradoValidator.validate(data.login);
        }
    }
};
UpdateUsuarioValidator = UpdateUsuarioValidator_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [email_ja_cadastrado_validator_1.EmailJaCadastradoValidator,
        login_ja_cadastrado_validator_1.LoginJaCadastradoValidator])
], UpdateUsuarioValidator);
exports.UpdateUsuarioValidator = UpdateUsuarioValidator;
//# sourceMappingURL=update-usuario.validator.js.map