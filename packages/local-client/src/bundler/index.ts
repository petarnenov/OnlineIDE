import * as esbuild from 'esbuild-wasm';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlugin } from './plugins/fetch-plugin';

type Service = 'down' | 'pending' | 'up';

let service: Service = 'down';

const bundle = async (rawCode: string) => {
  if (service !== 'up') {
    if (service === 'pending') {
      await new Promise((resolve, reject) => {
        const interval = setInterval(() => {
          if (service === 'up') {
            clearInterval(interval);
            resolve(true);
          }
        }, 100);
      });
    } else {
      service = 'pending';
      await esbuild.initialize({
        worker: true,
        wasmURL: 'https://unpkg.com/esbuild-wasm@0.13.13/esbuild.wasm',
      });
      service = 'up';
    }
  }

  try {
    const result = await esbuild.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],
      // work without this stuff, but point in the course
      define: {
        'process.env.NODE_ENV': '"production"',
        global: 'window',
      },
      jsxFactory: '_React.createElement',
      jsxFragment: '_React.Fragment',
    });
    return {
      code: result.outputFiles[0].text,
      err: '',
    };
  } catch (err) {
    throw Error((err as Error).message || 'Internal server error');
  }
};

export default bundle;
