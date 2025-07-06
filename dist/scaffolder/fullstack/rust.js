"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scaffoldFullstackRust = scaffoldFullstackRust;
const path_1 = __importDefault(require("path"));
const chalk_1 = __importDefault(require("chalk"));
;
const execa_1 = require("execa");
;
async function scaffoldFullstackRust(options) {
    const { projectName } = options;
    const projectPath = path_1.default.resolve(process.cwd(), projectName);
    const frontendPath = path_1.default.join(projectPath, "frontend");
    const backendPath = path_1.default.join(projectPath, "backend");
    console.log(chalk_1.default.cyan(`\n🦀 Creating Rust fullstack project (Yew + Actix)`));
    await (0, execa_1.execa)("cargo", ["new", "backend", "--bin"], { cwd: projectPath });
    await (0, execa_1.execa)("npx", ["create-yew-app", "frontend"], { cwd: projectPath, stdio: "inherit" });
    await (0, execa_1.execa)("git", ["init"], { cwd: projectPath });
    console.log(chalk_1.default.green(`\n✅ Rust fullstack scaffold ready.\n`));
}
