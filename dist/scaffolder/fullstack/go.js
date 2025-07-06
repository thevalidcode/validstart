"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scaffoldFullstackGo = scaffoldFullstackGo;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const chalk_1 = __importDefault(require("chalk"));
;
const execa_1 = require("execa");
;
async function scaffoldFullstackGo(options) {
    const { projectName, framework } = options;
    const projectPath = path_1.default.resolve(process.cwd(), projectName);
    console.log(chalk_1.default.cyan(`\n🐹 Creating Go fullstack project with ${chalk_1.default.bold(framework)}`));
    if (framework === "Buffalo") {
        await (0, execa_1.execa)("buffalo", ["new", projectName], { stdio: "inherit" });
        return;
    }
    const backend = path_1.default.join(projectPath, "backend");
    const frontend = path_1.default.join(projectPath, "frontend");
    await fs_extra_1.default.mkdirp(backend);
    await fs_extra_1.default.mkdirp(frontend);
    await fs_extra_1.default.writeFile(path_1.default.join(backend, "main.go"), `package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Go backend running")\n}`);
    await (0, execa_1.execa)("npm", ["create", "vite@latest", "frontend", "--", "--template", "react"], {
        cwd: projectPath,
        stdio: "inherit",
    });
    await (0, execa_1.execa)("git", ["init"], { cwd: projectPath });
    console.log(chalk_1.default.green(`\n✅ Go fullstack project '${projectName}' scaffolded\n`));
}
