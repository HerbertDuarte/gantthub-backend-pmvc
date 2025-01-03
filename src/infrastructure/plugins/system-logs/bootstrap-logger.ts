import { Logger } from '@nestjs/common';
import { HttpsOptions } from '@nestjs/common/interfaces/external/https-options.interface';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Environment } from '../../env/environment';

export function bootstrapLogger(
  app: NestExpressApplication,
  httpsOptions?: HttpsOptions,
) {
  const config = app.get(ConfigService<Environment, true>);
  const HTTP_PORT = config.get<string>('HTTP_PORT');
  const APP_HOSTNAME = config.get<string>('APP_HOSTNAME');
  const logger = new Logger('Bootstrap');
  const address =
    'http' +
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
