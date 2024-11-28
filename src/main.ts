import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { swaggerConfig } from './infrastructure/plugins/swagger/swagger.config';
import { sslConfig } from './infrastructure/plugins/ssl/ssl-config';
import { bootstrapLogger } from './infrastructure/plugins/system-logs/bootstrap-logger';

async function bootstrap() {
  const httpsOptions = sslConfig();

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    httpsOptions,
  });

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
  bootstrapLogger(app, httpsOptions);
}

bootstrap();
