#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const chalk = require("chalk");
const init_1 = require("./commands/init");
const program = new commander_1.Command();
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
    (0, init_1.runInitCommand)();
});
program.parse(process.argv);
