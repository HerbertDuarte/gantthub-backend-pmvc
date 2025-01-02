import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Environment } from 'src/infrastructure/env/environment.dto';

export function swaggerConfig(app: NestExpressApplication) {
  const config = app.get(ConfigService<Environment, true>);

  const swaggerConfig = new DocumentBuilder()
    .setTitle(config.get('APP_NAME'))
    .setDescription(config.get('APP_NAME'))
    .setVersion(config.get('APP_VERSION'))
    .addTag('Módulos')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);
}
