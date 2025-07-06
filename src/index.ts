#!/usr/bin/env node

import { Command } from "commander";
import chalk from "chalk";;
import { runInitCommand } from "./commands/init";

const program = new Command();

program
  .name("validstart")
  .description("🚀 Scaffold any project in any language or framework with ease.")
  .version("1.0.0");

program
  .command("hello")
  .description("Test command")
  .action(() => {
    console.log(chalk.green("✅ Hello from validstart!"));
  });

program
  .command("init")
  .description("Start an interactive project scaffolding process")
  .action(() => {
    runInitCommand();
  });

program.parse(process.argv);
