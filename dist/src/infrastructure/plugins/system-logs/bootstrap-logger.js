"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bootstrapLogger = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
function bootstrapLogger(app, httpsOptions) {
    const config = app.get((config_1.ConfigService));
    const HTTP_PORT = config.get('HTTP_PORT');
    const APP_HOSTNAME = config.get('APP_HOSTNAME');
    const logger = new common_1.Logger('Bootstrap');
    const address = 'http' +
        (httpsOptions ? 's' : '') +
        '://' +
        APP_HOSTNAME +
        ':' +
        HTTP_PORT +
        '/';
    app
        .listen(HTTP_PORT)
        .then(() => {
        logger.log(`Nest app is running on ${address} 🚀`);
        logger.log(`API documentation is running on ${address}api 📚`);
    })
        .catch((error) => logger.error(error));
}
exports.bootstrapLogger = bootstrapLogger;
//# sourceMappingURL=bootstrap-logger.js.map