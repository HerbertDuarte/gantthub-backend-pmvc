import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { swaggerConfig } from './infrastructure/plugins/swagger/swagger.config';
import { bootstrapLogger } from './infrastructure/plugins/system-logs/bootstrap-logger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.enableCors({
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });

  swaggerConfig(app);
  app.enableShutdownHooks();
  bootstrapLogger(app);
}

bootstrap();
