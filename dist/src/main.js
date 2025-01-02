"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const swagger_config_1 = require("./infrastructure/plugins/swagger/swagger.config");
const bootstrap_logger_1 = require("./infrastructure/plugins/system-logs/bootstrap-logger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
    }));
    app.enableCors();
    (0, swagger_config_1.swaggerConfig)(app);
    app.enableShutdownHooks();
    (0, bootstrap_logger_1.bootstrapLogger)(app);
}
bootstrap();
//# sourceMappingURL=main.js.map