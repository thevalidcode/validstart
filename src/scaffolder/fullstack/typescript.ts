import fs from "fs-extra";
import path from "path";
import chalk from "chalk";;

import { execa } from "execa";;

interface Options {
  projectName: string;
  projectType: string;
  language: string;
  framework: string;
  selectedTools: string[];
}

export async function scaffoldFullstackTS(options: Options): Promise<void> {
  const { projectName, framework } = options;
  const projectPath = path.resolve(process.cwd(), projectName);

  console.log(
    chalk.cyan(`\n🌐 Creating TypeScript fullstack project with ${chalk.bold(framework)}`),
  );
  await fs.mkdirp(projectPath);

  switch (framework.toLowerCase()) {
    case "next.js":
      await execa("npx", ["create-next-app@latest", ".", "--ts", "--app"], {
        cwd: projectPath,
        stdio: "inherit",
      });
      break;

    case "remix":
      await execa("npx", ["create-remix", "."], {
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
      await execa("npx", ["blitz", "new", projectName, "--typescript"], {
        stdio: "inherit",
      });
      return; // Already handles all
  }

  console.log(chalk.gray("🔧 Initializing git..."));
  await execa("git", ["init"], { cwd: projectPath });

  console.log(
    chalk.green(`\n✅ ${framework} fullstack project '${projectName}' created at ${projectPath}\n`),
  );
}

async function scaffoldTRPC(projectPath: string) {
  const repo = "https://github.com/trpc/next-prisma-starter.git";
  console.log(chalk.gray("📦 Cloning tRPC starter..."));
  await execa("git", ["clone", repo, "."], { cwd: projectPath });
  await fs.remove(path.join(projectPath, ".git"));
}
