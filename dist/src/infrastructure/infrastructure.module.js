"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InfrastructureModule = void 0;
const common_1 = require("@nestjs/common");
const login_service_1 = require("./adapter/service/login.service");
const auth_usuario_validator_1 = require("../domain/application/validators/auth-usuario.validator");
const jwt_strategy_1 = require("./adapter/strategy/jwt.strategy");
const local_strategy_1 = require("./adapter/strategy/local.strategy");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const auth_controller_1 = require("./adapter/controller/auth.controller");
const atualiza_perfil_usecase_1 = require("../domain/application/usecases/usuario/atualiza-perfil.usecase");
const criar_usuario_usecase_1 = require("../domain/application/usecases/usuario/criar-usuario.usecase");
const deletar_usuario_usecase_1 = require("../domain/application/usecases/usuario/deletar-usuario.usecase");
const email_ja_cadastrado_validator_1 = require("../domain/application/validators/email-ja-cadastrado.validator");
const login_ja_cadastrado_validator_1 = require("../domain/application/validators/login-ja-cadastrado.validator");
const senha_valida_validator_1 = require("../domain/application/validators/senha-valida.validator");
const update_usuario_validator_1 = require("../domain/application/validators/update-usuario.validator");
const usuario_prisma_repository_1 = require("./repository/usuario-prisma.repository");
const database_module_1 = require("./plugins/database/database.module");
const atualizar_usuario_usecase_1 = require("../domain/application/usecases/usuario/atualizar-usuario.usecase");
const buscar_por_id_usuario_usecase_1 = require("../domain/application/usecases/usuario/buscar-por-id-usuario.usecase");
const buscar_usuarios_paginacao_usecase_1 = require("../domain/application/usecases/usuario/buscar-usuarios-paginacao.usecase");
const usuario_controller_1 = require("./adapter/controller/usuario.controller");
const projeto_controller_1 = require("./adapter/controller/projeto.controller.");
const projeto_prisma_repository_1 = require("./repository/projeto-prisma.repository");
const tarefa_controller_1 = require("./adapter/controller/tarefa.controller");
const tarefa_prisma_repository_1 = require("./repository/tarefa-prisma.repository");
const marco_controller_1 = require("./adapter/controller/marco.controller");
const marco_prisma_repository_1 = require("./repository/marco-prisma.repository");
const usecases = [
    login_service_1.LoginService,
    criar_usuario_usecase_1.CriarUsuarioUseCase,
    atualizar_usuario_usecase_1.AtualizarUsuarioUseCase,
    deletar_usuario_usecase_1.DeletarUsuarioUseCase,
    buscar_por_id_usuario_usecase_1.BuscarPorIdUsuarioUseCase,
    buscar_usuarios_paginacao_usecase_1.BuscarUsuariosPaginacaoUseCase,
    atualiza_perfil_usecase_1.AtualizarPerfilUsuarioUseCase,
];
const repositories = [
    usuario_prisma_repository_1.UsuarioPrismaRepository,
    projeto_prisma_repository_1.ProjetoPrismaRepository,
    tarefa_prisma_repository_1.TarefaPrismaRepository,
    marco_prisma_repository_1.MarcoPrismaRepository,
];
const validators = [
    email_ja_cadastrado_validator_1.EmailJaCadastradoValidator,
    login_ja_cadastrado_validator_1.LoginJaCadastradoValidator,
    senha_valida_validator_1.SenhaValidaValidator,
    update_usuario_validator_1.UpdateUsuarioValidator,
    auth_usuario_validator_1.AuthUsuarioValidator,
];
const strategies = [local_strategy_1.LocalStrategy, jwt_strategy_1.JwtStrategy];
const utils = [common_1.Logger];
const providers = [
    ...usecases,
    ...repositories,
    ...validators,
    ...strategies,
    ...utils,
];
let InfrastructureModule = class InfrastructureModule {
};
InfrastructureModule = __decorate([
    (0, common_1.Module)({
        imports: [
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
            database_module_1.DatabaseModule,
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => ({
                    secret: configService.get('JWT_SECRET'),
                    signOptions: { expiresIn: configService.get('JWT_EXPIRE') },
                }),
                inject: [config_1.ConfigService],
            }),
        ],
        controllers: [
            auth_controller_1.AuthController,
            usuario_controller_1.UsuarioController,
            projeto_controller_1.ProjetoController,
            tarefa_controller_1.TarefaController,
            marco_controller_1.MarcoController,
        ],
        providers,
        exports: providers,
    })
], InfrastructureModule);
exports.InfrastructureModule = InfrastructureModule;
//# sourceMappingURL=infrastructure.module.js.map