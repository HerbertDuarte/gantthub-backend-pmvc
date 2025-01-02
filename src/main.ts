import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { swaggerConfig } from './infrastructure/plugins/swagger/swagger.config';
import { bootstrapLogger } from './infrastructure/plugins/system-logs/bootstrap-logger';

let app;

async function bootstrap() {
  if (!app) {
    app = await NestFactory.create(AppModule);
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    );
    app.enableCors();
    swaggerConfig(app);
    app.enableShutdownHooks();
    bootstrapLogger(app);
    await app.init();
  }
  return app;
}

export default async (req, res) => {
  const appInstance = await bootstrap();
  const expressApp = appInstance.getHttpAdapter().getInstance();
  return expressApp(req, res);
};
