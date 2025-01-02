"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerConfig = void 0;
const config_1 = require("@nestjs/config");
const swagger_1 = require("@nestjs/swagger");
function swaggerConfig(app) {
    const config = app.get((config_1.ConfigService));
    const swaggerConfig = new swagger_1.DocumentBuilder()
        .setTitle(config.get('APP_NAME'))
        .setDescription(config.get('APP_NAME'))
        .setVersion(config.get('APP_VERSION'))
        .addTag('Módulos')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, swaggerConfig);
    swagger_1.SwaggerModule.setup('api', app, document);
}
exports.swaggerConfig = swaggerConfig;
//# sourceMappingURL=swagger.config.js.map