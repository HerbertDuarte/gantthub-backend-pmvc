import { HttpsOptions } from '@nestjs/common/interfaces/external/https-options.interface';
import { NestExpressApplication } from '@nestjs/platform-express';
export declare function bootstrapLogger(app: NestExpressApplication, httpsOptions?: HttpsOptions): void;
