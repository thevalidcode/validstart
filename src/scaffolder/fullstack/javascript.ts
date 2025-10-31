import fs from "fs-extra";
import path from "path";
import chalk from "chalk";

import { execa } from "execa";

interface Options {
  projectName: string;
  projectType: string;
  language: string;
  framework: string;
  selectedTools: string[];
}

export async function scaffoldFullstackJS(options: Options): Promise<void> {
  const { projectName, framework, selectedTools } = options;
  const projectPath = path.resolve(process.cwd(), projectName);

  console.log(
    chalk.cyan(`\n🌐 Creating JavaScript fullstack project with ${chalk.bold(framework)}`),
  );
  await fs.mkdirp(projectPath);

  switch (framework.toLowerCase()) {
    case "next.js":
    case "remix":
      await execa(
        "npx",
        ["create-" + framework.split(".")[0].toLowerCase() + "-app", ".", "--js"],
        {
          cwd: projectPath,
          stdio: "inherit",
        },
      );
      break;

    case "meteor":
      await execa("npx", ["create", projectName], {
        stdio: "inherit",
      });
      return; // Meteor sets its own folder
  }
  const toolDeps: string[] = [];

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
    chalk.green(`\n✅ JavaScript fullstack project '${projectName}' created at ${projectPath}\n`),
  );
}

async function setupTailwind(projectPath: string): Promise<void> {
  console.log(chalk.blue(`⚙️ Setting up TailwindCSS...`));

  await execa("npx", ["tailwindcss", "init", "-p"], { cwd: projectPath });

  const possiblePaths = [
    path.join(projectPath, "src", "app", "globals.css"),
    path.join(projectPath, "src", "globals.css"),
    path.join(projectPath, "app", "globals.css"),
    path.join(projectPath, "src", "index.css"),
  ];

  let cssFile = "";
  for (const p of possiblePaths) {
    if (await fs.pathExists(p)) {
      cssFile = p;
      break;
    }
  }

  // If no CSS file exists, create one
  if (!cssFile) {
    const fallback = path.join(projectPath, "src", "globals.css");
    await fs.ensureDir(path.dirname(fallback));
    await fs.writeFile(fallback, "");
    cssFile = fallback;
    console.log(chalk.gray(`ℹ️ No existing CSS file found, created: ${cssFile}`));
  }

  // Tailwind directives
  const tailwindDirectives = `@tailwind base;
@tailwind components;
@tailwind utilities;
`;

  const existingContent = await fs.readFile(cssFile, "utf8");
  if (!existingContent.includes("@tailwind")) {
    const newContent = tailwindDirectives + "\n" + existingContent;
    await fs.writeFile(cssFile, newContent);
    console.log(chalk.green(`✅ TailwindCSS directives added to: ${cssFile}`));
  } else {
    console.log(chalk.yellow(`⚠️ Tailwind directives already exist in: ${cssFile}`));
  }

  // Update Tailwind config
  const configPath = path.join(projectPath, "tailwind.config.js");
  const updatedConfig = `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};`;

  await fs.writeFile(configPath, updatedConfig);
  console.log(chalk.green("✅ TailwindCSS configuration updated.\n"));
}
