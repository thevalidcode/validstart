"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scaffoldCLIToolGo = scaffoldCLIToolGo;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const chalk_1 = __importDefault(require("chalk"));
const execa_1 = require("execa");
async function scaffoldCLIToolGo({ projectName }) {
    const projectPath = path_1.default.resolve(process.cwd(), projectName);
    await fs_extra_1.default.mkdirp(projectPath);
    await (0, execa_1.execa)("go", ["mod", "init", projectName], { cwd: projectPath });
    const code = `package main\n\nimport (\n\t"fmt"\n\t"github.com/spf13/cobra"\n)\n\nfunc main() {\n\tvar rootCmd = &cobra.Command{\n\t\tUse:   "${projectName}",\n\t\tShort: "A CLI tool",\n\t\tRun: func(cmd *cobra.Command, args []string) {\n\t\t\tfmt.Println("Hello from Go CLI!")\n\t\t},\n\t}\n\trootCmd.Execute()\n}\n`;
    await fs_extra_1.default.writeFile(path_1.default.join(projectPath, "main.go"), code);
    console.log(chalk_1.default.green(`✅ Go CLI tool '${projectName}' scaffolded.`));
}
