#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const chalk_1 = __importDefault(require("chalk"));
;
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
    console.log(chalk_1.default.green("✅ Hello from validstart!"));
});
program
    .command("init")
    .description("Start an interactive project scaffolding process")
    .action(() => {
    (0, init_1.runInitCommand)();
});
program.parse(process.argv);
