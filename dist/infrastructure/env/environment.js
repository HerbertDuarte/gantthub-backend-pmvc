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
exports.validateEnv = exports.Environment = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const invalid_env_exception_1 = require("./exception/invalid-env.exception");
class Environment {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Environment.prototype, "APP_NAME", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Environment.prototype, "APP_HOSTNAME", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Environment.prototype, "APP_VERSION", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumberString)(),
    __metadata("design:type", Number)
], Environment.prototype, "HTTP_PORT", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(['production', 'development', 'test']),
    __metadata("design:type", String)
], Environment.prototype, "NODE_ENV", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Environment.prototype, "JWT_SECRET", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Environment.prototype, "JWT_EXPIRE", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Environment.prototype, "DATABASE_URL", void 0);
exports.Environment = Environment;
function validateEnv(config) {
    const envConfig = (0, class_transformer_1.plainToClass)(Environment, config);
    const errors = (0, class_validator_1.validateSync)(envConfig, { skipMissingProperties: false });
    if (errors.length > 0) {
        throw new invalid_env_exception_1.InvalidEnvironmentException(errors.toString());
    }
    return envConfig;
}
exports.validateEnv = validateEnv;
//# sourceMappingURL=environment.js.map