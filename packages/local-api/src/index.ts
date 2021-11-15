import path from 'path';
import express from 'express';
import cors from 'cors';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { createCellsRouter } from './routes';

export interface ServeConfig {
  port: number;
  filename: string;
  dir: string;
  useProxy: boolean;
}

export const serve = (serveConfig: ServeConfig) => {
  const { port, filename, dir, useProxy } = serveConfig;
  const app = express();

  app.use(cors());
  app.use(express.json());
  
  app.use('/cells', createCellsRouter(filename, dir));

  if (useProxy) {
    const packagePath = require.resolve('local-client/build/index.html');
    app.use(express.static(path.dirname(packagePath)));
  } else {
    app.use(
      createProxyMiddleware({
        target: 'http://localhost:3000',
        ws: true,
        logLevel: 'silent',
      })
    );
  }

  return new Promise<void>((resolve, reject) => {
    app.listen(port, resolve).on('error', reject);
  });
};
