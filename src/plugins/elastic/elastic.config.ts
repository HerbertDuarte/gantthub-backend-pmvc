import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import * as Elasticsearch from 'elasticsearch';
import * as winElasticsearch from 'winston-elasticsearch';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Environment } from 'env/environment.dto';

export function elasticConfig(app: NestExpressApplication) {
  const config = app.get(ConfigService<Environment, true>);

  const APP_NAME = config.get<string>('APP_NAME');
  const NODE_ENV = config.get<string>('NODE_ENV');
  const ELASTICSEARCH = config.get<string>('ELASTICSEARCH');

  app.useLogger(
    WinstonModule.createLogger({
      transports: ((): any[] => {
        const transports = [
          // Winston
          new winston.transports.Console({
            level: 'debug',
            format: winston.format.combine(
              winston.format.colorize(),
              winston.format.timestamp(),
              winston.format.printf(
                (info) => `${info.timestamp} ${info.level}: ${info.message}`,
              ),
            ),
          }),

          new winElasticsearch({
            indexPrefix: `logs-${APP_NAME}`,
            client: new Elasticsearch.Client({
              host: ELASTICSEARCH,
            }),
            level: 'debug',
            transformer: (logData: any) => {
              const transformed: any = {};
              transformed['@timestamp'] =
                logData.timestamp ?? new Date().toISOString();
              transformed.message = logData.message;
              transformed.severity = logData.level;
              transformed.fields =
                typeof logData.meta?.context === 'object'
                  ? { ...logData.meta.context }
                  : typeof logData.meta?.stack?.[0] === 'object'
                  ? { ...logData.meta?.stack?.[0] }
                  : { stack: logData.meta?.stack?.[0] };

              transformed.logId = transformed.fields.logId;
              delete transformed.fields.logId;

              return transformed;
            },
          }),
        ];

        if (NODE_ENV !== 'production') {
          return transports;
        }

        transports.splice(0, 1);

        return transports;
      })(),
    }),
  );
}
