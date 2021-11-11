import path from 'path';
import { Command } from 'commander';
import { serve } from 'local-api';

export type ServeCommandOptions = { port: string };

export const serveCommand = new Command()
  .command('serve [filename]')
  .description('open a file for editing')
  .option('-p,--port <number>', 'port to run server on', '1971')
  .action((filename = 'notebook.js', options: ServeCommandOptions) => {
    const port = parseInt(options.port);
    const dir = path.join(process.cwd(), path.dirname(filename));

    serve({ filename: path.basename(filename), port, dir });
  });
