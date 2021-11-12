import express from 'express';
import cores from 'cors';
import proxy from 'http-proxy-middleware';

export interface ServeConfig {
  port: number;
  filename: string;
  dir: string;
}

export const serve = (serveConfig: ServeConfig) => {
  const app = express();
  const { port, filename, dir } = serveConfig;
  return new Promise<void>((resolve, reject) => {
    app.listen(port, resolve).on('error', reject);
  });
};
