"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scaffoldCLIToolRust = scaffoldCLIToolRust;
const execa_1 = require("execa");
;
const path_1 = __importDefault(require("path"));
const chalk_1 = __importDefault(require("chalk"));
;
const fs_extra_1 = __importDefault(require("fs-extra"));
async function scaffoldCLIToolRust({ projectName }) {
    const projectPath = path_1.default.resolve(process.cwd(), projectName);
    await (0, execa_1.execa)("cargo", ["new", projectName, "--bin"], { stdio: "inherit" });
    const mainPath = path_1.default.join(projectPath, "src", "main.rs");
    const code = `use clap::Parser;\n\n#[derive(Parser)]\n#[command(name = "${projectName}")]\nstruct Cli {}\n\nfn main() {\n    println!("Hello from Rust CLI!");\n}`;
    await fs_extra_1.default.writeFile(mainPath, code);
    console.log(chalk_1.default.green(`✅ Rust CLI tool '${projectName}' scaffolded.`));
}
