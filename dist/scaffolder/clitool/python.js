"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scaffoldCLIToolPython = scaffoldCLIToolPython;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const chalk = require("chalk");
async function scaffoldCLIToolPython({ projectName }) {
    const projectPath = path_1.default.resolve(process.cwd(), projectName);
    await fs_extra_1.default.mkdirp(projectPath);
    const code = `import click\n\n@click.command()\ndef hello():\n    click.echo("Hello from Python CLI!")\n\nif __name__ == "__main__":\n    hello()\n`;
    await fs_extra_1.default.writeFile(path_1.default.join(projectPath, "main.py"), code);
    console.log(chalk.green(`✅ Python CLI tool '${projectName}' created with Click.`));
}
