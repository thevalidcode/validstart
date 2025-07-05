"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scaffoldLibGo = scaffoldLibGo;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const chalk_1 = __importDefault(require("chalk"));
const execa_1 = require("execa");
async function scaffoldLibGo({ projectName }) {
    const projectPath = path_1.default.resolve(process.cwd(), projectName);
    await fs_extra_1.default.mkdirp(projectPath);
    await (0, execa_1.execa)("go", ["mod", "init", projectName], { cwd: projectPath });
    await fs_extra_1.default.outputFile(path_1.default.join(projectPath, "lib.go"), `package ${projectName.replace(/-/g, "")}\n\nfunc Hello() string {\n\treturn "Hello from Go library"\n}`);
    console.log(chalk_1.default.green(`✅ Go library '${projectName}' created with go modules.`));
}
