"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scaffoldFrontendJS = scaffoldFrontendJS;
const execa_1 = require("execa");
const path_1 = __importDefault(require("path"));
const chalk = require("chalk");
const fs_extra_1 = __importDefault(require("fs-extra"));
async function scaffoldFrontendJS(options) {
    const { projectName, framework, selectedTools } = options;
    const projectPath = path_1.default.resolve(process.cwd(), projectName);
    if (framework !== "React") {
        console.log(chalk.red(`❌ Only React is supported for JavaScript frontend at the moment.`));
        return;
    }
    console.log(chalk.cyan(`\n🚧 Creating React + Vite project: ${chalk.bold(projectName)}`));
    await (0, execa_1.execa)("npm", ["create", "vite@latest", projectName, "--", "--template", "react"], {
        stdio: "inherit",
    });
    const toolDeps = [];
    if (selectedTools.includes("react-router-dom")) {
        toolDeps.push("react-router-dom");
    }
    if (selectedTools.includes("tailwindcss")) {
        toolDeps.push("tailwindcss", "postcss", "autoprefixer");
        await setupTailwind(projectPath);
    }
    if (selectedTools.includes("shadcn/ui")) {
        toolDeps.push("class-variance-authority", "tailwind-variants", "lucide-react");
        console.log(chalk.yellow("⚠️ You will need to manually initialize shadcn/ui afterwards."));
    }
    if (toolDeps.length > 0) {
        console.log(chalk.blue(`📦 Installing additional tools: ${toolDeps.join(", ")}`));
        await (0, execa_1.execa)("npm", ["install", ...toolDeps], {
            cwd: projectPath,
            stdio: "inherit",
        });
    }
    console.log(chalk.gray("🔧 Initializing git..."));
    await (0, execa_1.execa)("git", ["init"], { cwd: projectPath });
    console.log(chalk.green(`\n✅ React project '${projectName}' created at ${projectPath}\n`));
}
async function setupTailwind(projectPath) {
    console.log(chalk.blue(`⚙️ Setting up TailwindCSS...`));
    await (0, execa_1.execa)("npx", ["tailwindcss", "init", "-p"], { cwd: projectPath });
    const inputCssPath = path_1.default.join(projectPath, "src", "index.css");
    const tailwindDirectives = `@tailwind base;\n@tailwind components;\n@tailwind utilities;\n`;
    if (await fs_extra_1.default.pathExists(inputCssPath)) {
        await fs_extra_1.default.writeFile(inputCssPath, tailwindDirectives);
    }
    const configPath = path_1.default.join(projectPath, "tailwind.config.js");
    const updatedConfig = `module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: { extend: {} },
  plugins: [],
};`;
    await fs_extra_1.default.writeFile(configPath, updatedConfig);
}
