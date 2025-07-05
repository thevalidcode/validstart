import { execa } from "execa";
import path from "path";
import chalk from "chalk";
import fs from "fs-extra";

interface Options {
  projectName: string;
  projectType: string;
  language: string;
  framework: string;
  selectedTools: string[];
}

export async function scaffoldFrontendTS(options: Options): Promise<void> {
  const { projectName, framework, selectedTools } = options;
  const projectPath = path.resolve(process.cwd(), projectName);

  if (framework !== "React") {
    console.log(chalk.red(`❌ Only React is supported for TypeScript frontend at the moment.`));
    return;
  }

  console.log(
    chalk.cyan(`\n🚧 Creating React + TypeScript (Vite) project: ${chalk.bold(projectName)}`),
  );
  await execa("npm", ["create", "vite@latest", projectName, "--", "--template", "react-ts"], {
    stdio: "inherit",
  });

  const toolDeps: string[] = [];

  if (selectedTools.includes("react-router-dom")) {
    toolDeps.push("react-router-dom", "@types/react-router-dom");
  }

  if (selectedTools.includes("tailwindcss")) {
    toolDeps.push("tailwindcss", "postcss", "autoprefixer");
    await setupTailwind(projectPath);
  }

  if (selectedTools.includes("shadcn/ui")) {
    toolDeps.push("class-variance-authority", "tailwind-variants", "lucide-react");
    console.log(chalk.yellow("⚠️ You’ll need to manually initialize shadcn/ui after setup."));
  }

  if (toolDeps.length > 0) {
    console.log(chalk.blue(`📦 Installing selected tools: ${toolDeps.join(", ")}`));
    await execa("npm", ["install", ...toolDeps], {
      cwd: projectPath,
      stdio: "inherit",
    });
  }

  console.log(chalk.gray("🔧 Initializing git..."));
  await execa("git", ["init"], { cwd: projectPath });

  console.log(
    chalk.green(`\n✅ React + TypeScript project '${projectName}' created at ${projectPath}\n`),
  );
}

async function setupTailwind(projectPath: string): Promise<void> {
  console.log(chalk.blue(`⚙️ Setting up TailwindCSS...`));
  await execa("npx", ["tailwindcss", "init", "-p"], { cwd: projectPath });

  const inputCssPath = path.join(projectPath, "src", "index.css");
  const tailwindDirectives = `@tailwind base;\n@tailwind components;\n@tailwind utilities;\n`;

  if (await fs.pathExists(inputCssPath)) {
    await fs.writeFile(inputCssPath, tailwindDirectives);
  }

  const configPath = path.join(projectPath, "tailwind.config.js");
  const updatedConfig = `module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: { extend: {} },
  plugins: [],
};`;

  await fs.writeFile(configPath, updatedConfig);
}
