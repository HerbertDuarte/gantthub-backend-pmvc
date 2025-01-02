// api/server.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { Request, Response } from 'express';
import * as serverless from 'serverless-http';

let cachedServer;

async function bootstrap() {
  if (!cachedServer) {
    const app = await NestFactory.create(AppModule);
    await app.init();
    cachedServer = serverless(app.getHttpAdapter().getInstance());
  }
  return cachedServer;
}

export const handler = async (event: Request, context: Response) => {
  const server = await bootstrap();
  return server(event, context);
};
