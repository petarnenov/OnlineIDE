import path from "path";
import { Command } from "commander";
import { serve } from "@pnp-js/local-api";

export type ServeCommandOptions = { port: string };

export const serveCommand = new Command()
  .command("serve [filename]")
  .description("open a file for editing")
  .option("-p,--port <number>", "port to run server on", "3003")
  .action(async (filename = "notebook.js", options: ServeCommandOptions) => {
    try {
      const port = parseInt(options.port);
      const dir = path.join(process.cwd(), path.dirname(filename));
      const useProxy = process.env.NODE_ENV === "production";

      await serve({ filename: path.basename(filename), port, dir, useProxy });
      console.log(
        `Opened file ${filename}. Navigate to http://localhost:${port} to edit the file.`
      );
    } catch (err) {
      if (err instanceof Error) {
        if ((err as any).code === "EADDRINUSE") {
          console.error("Try running on different port. Use -p, --port <PORT>");
        } else {
          console.error("Serve error: ", err.message);
        }
      }
      process.exit(1);
    }
  });
