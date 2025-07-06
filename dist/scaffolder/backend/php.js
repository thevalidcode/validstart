"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scaffoldBackendPHP = scaffoldBackendPHP;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const chalk = require("chalk");
const execa_1 = require("execa");
async function scaffoldBackendPHP(options) {
    const { projectName, framework } = options;
    const projectPath = path_1.default.resolve(process.cwd(), projectName);
    console.log(chalk.cyan(`\n🐘 Creating PHP backend project with ${chalk.bold(framework)}`));
    if (framework.toLowerCase() === "laravel") {
        await (0, execa_1.execa)("composer", ["create-project", "--prefer-dist", "laravel/laravel", projectName], {
            stdio: "inherit",
        });
    }
    else if (framework.toLowerCase() === "symfony") {
        await (0, execa_1.execa)("composer", ["create-project", "symfony/skeleton", projectName], {
            stdio: "inherit",
        });
    }
    else {
        await fs_extra_1.default.mkdirp(projectPath);
        await fs_extra_1.default.writeFile(path_1.default.join(projectPath, "index.php"), `<?php echo "Hello from PHP!"; ?>`);
    }
    console.log(chalk.gray("🔧 Initializing git..."));
    await (0, execa_1.execa)("git", ["init"], { cwd: projectPath });
    console.log(chalk.green(`\n✅ PHP project '${projectName}' created at ${projectPath}\n`));
}
