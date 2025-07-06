"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scaffoldCLIToolTS = scaffoldCLIToolTS;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const chalk = require("chalk");
const execa_1 = require("execa");
async function scaffoldCLIToolTS({ projectName }) {
    const projectPath = path_1.default.resolve(process.cwd(), projectName);
    await fs_extra_1.default.mkdirp(projectPath);
    await (0, execa_1.execa)("npm", ["init", "-y"], { cwd: projectPath });
    await (0, execa_1.execa)("npm", ["install", "oclif", "typescript", "ts-node", "@oclif/core"], {
        cwd: projectPath,
        stdio: "inherit",
    });
    const srcDir = path_1.default.join(projectPath, "src");
    await fs_extra_1.default.mkdirp(srcDir);
    await fs_extra_1.default.writeFile(path_1.default.join(srcDir, "index.ts"), `import { Command, Flags } from '@oclif/core';\n\nclass Hello extends Command {\n  async run() {\n    this.log("Hello CLI in TS!");\n  }\n}\n\nexport = Hello;`);
    console.log(chalk.green(`✅ TypeScript CLI project '${projectName}' scaffolded.`));
}
