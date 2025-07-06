"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scaffoldFullstackTS = scaffoldFullstackTS;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const chalk = require("chalk");
const execa_1 = require("execa");
async function scaffoldFullstackTS(options) {
    const { projectName, framework } = options;
    const projectPath = path_1.default.resolve(process.cwd(), projectName);
    console.log(chalk.cyan(`\n🌐 Creating TypeScript fullstack project with ${chalk.bold(framework)}`));
    await fs_extra_1.default.mkdirp(projectPath);
    switch (framework.toLowerCase()) {
        case "next.js":
            await (0, execa_1.execa)("npx", ["create-next-app@latest", ".", "--ts", "--app"], {
                cwd: projectPath,
                stdio: "inherit",
            });
            break;
        case "remix":
            await (0, execa_1.execa)("npx", ["create-remix", "."], {
                cwd: projectPath,
                stdio: "inherit",
                env: {
                    ...process.env,
                    INIT_CWD: projectPath,
                },
            });
            break;
        case "trpc":
            await scaffoldTRPC(projectPath);
            break;
        case "blitz.js":
            await (0, execa_1.execa)("npx", ["blitz", "new", projectName, "--typescript"], {
                stdio: "inherit",
            });
            return; // Already handles all
    }
    console.log(chalk.gray("🔧 Initializing git..."));
    await (0, execa_1.execa)("git", ["init"], { cwd: projectPath });
    console.log(chalk.green(`\n✅ ${framework} fullstack project '${projectName}' created at ${projectPath}\n`));
}
async function scaffoldTRPC(projectPath) {
    const repo = "https://github.com/trpc/next-prisma-starter.git";
    console.log(chalk.gray("📦 Cloning tRPC starter..."));
    await (0, execa_1.execa)("git", ["clone", repo, "."], { cwd: projectPath });
    await fs_extra_1.default.remove(path_1.default.join(projectPath, ".git"));
}
