"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scaffoldLibRust = scaffoldLibRust;
const execa_1 = require("execa");
const chalk = require("chalk");
async function scaffoldLibRust({ projectName }) {
    await (0, execa_1.execa)("cargo", ["new", "--lib", projectName], { stdio: "inherit" });
    console.log(chalk.green(`✅ Rust library '${projectName}' scaffolded using Cargo.`));
}
