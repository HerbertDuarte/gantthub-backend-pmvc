import { readFileSync } from 'fs';

export type HttpOptions = {
  key: Buffer;
  cert: Buffer;
};

export function sslConfig(): HttpOptions | null {
  let httpsOptions = null;
  const ssl = process.env.SSL === 'true';
  if (ssl) {
    const keyPath = readFileSync(__dirname + '/../../ssl/server.key');
    const certPath = readFileSync(__dirname + '/../../ssl/ssl-bundle.crt');
    httpsOptions = {
      key: keyPath,
      cert: certPath,
    };
  }
  return httpsOptions;
}
