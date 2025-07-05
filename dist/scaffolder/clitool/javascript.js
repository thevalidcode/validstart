"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scaffoldCLIToolJS = scaffoldCLIToolJS;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const chalk_1 = __importDefault(require("chalk"));
async function scaffoldCLIToolJS({ projectName }) {
    const projectPath = path_1.default.resolve(process.cwd(), projectName);
    await fs_extra_1.default.mkdirp(projectPath);
    const pkg = {
        name: projectName,
        version: "1.0.0",
        bin: {
            [projectName]: "./index.js",
        },
        dependencies: {
            commander: "^11.0.0",
        },
    };
    await fs_extra_1.default.writeJson(path_1.default.join(projectPath, "package.json"), pkg, { spaces: 2 });
    await fs_extra_1.default.writeFile(path_1.default.join(projectPath, "index.js"), `#!/usr/bin/env node\nconst { program } = require("commander");\n\nprogram.version("1.0.0");\nprogram.command("hello").action(() => console.log("Hello CLI"));\n\nprogram.parse();\n`);
    await fs_extra_1.default.chmod(path_1.default.join(projectPath, "index.js"), 0o755);
    console.log(chalk_1.default.green(`✅ JavaScript CLI project '${projectName}' scaffolded.`));
}
