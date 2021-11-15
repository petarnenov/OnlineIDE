#!/usr/bin node
import { program } from "commander";
import { serveCommand } from "./commands";

// add any other commands
program.addCommand(serveCommand);

program.parse(process.argv);
