"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scaffoldFullstackPython = scaffoldFullstackPython;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const chalk_1 = __importDefault(require("chalk"));
const execa_1 = require("execa");
async function scaffoldFullstackPython(options) {
    const { projectName, framework } = options;
    const projectPath = path_1.default.resolve(process.cwd(), projectName);
    console.log(chalk_1.default.cyan(`\n🐍 Creating Python fullstack project with ${chalk_1.default.bold(framework)}`));
    await fs_extra_1.default.mkdirp(projectPath);
    if (framework.includes("Django")) {
        await (0, execa_1.execa)("django-admin", ["startproject", projectName], { cwd: path_1.default.dirname(projectPath) });
        await (0, execa_1.execa)("git", ["init"], { cwd: projectPath });
        return;
    }
    if (framework.includes("FastAPI")) {
        const backendPath = path_1.default.join(projectPath, "backend");
        const frontendPath = path_1.default.join(projectPath, "frontend");
        await fs_extra_1.default.mkdirp(backendPath);
        await fs_extra_1.default.mkdirp(frontendPath);
        await fs_extra_1.default.writeFile(path_1.default.join(backendPath, "main.py"), `from fastapi import FastAPI\n\napp = FastAPI()\n\n@app.get("/")\ndef root():\n    return {"msg": "FastAPI backend running"}\n`);
        await (0, execa_1.execa)("npm", ["create", "vite@latest", "frontend", "--", "--template", "vanilla"], {
            cwd: projectPath,
            stdio: "inherit",
        });
        await (0, execa_1.execa)("git", ["init"], { cwd: projectPath });
    }
    console.log(chalk_1.default.green(`\n✅ Python fullstack project '${projectName}' created at ${projectPath}\n`));
}
