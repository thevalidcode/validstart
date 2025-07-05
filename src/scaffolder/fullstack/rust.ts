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

export async function scaffoldFullstackRust(options: Options): Promise<void> {
  const { projectName } = options;
  const projectPath = path.resolve(process.cwd(), projectName);
  const frontendPath = path.join(projectPath, "frontend");
  const backendPath = path.join(projectPath, "backend");

  console.log(chalk.cyan(`\n🦀 Creating Rust fullstack project (Yew + Actix)`));
  await execa("cargo", ["new", "backend", "--bin"], { cwd: projectPath });
  await execa("npx", ["create-yew-app", "frontend"], { cwd: projectPath, stdio: "inherit" });

  await execa("git", ["init"], { cwd: projectPath });
  console.log(chalk.green(`\n✅ Rust fullstack scaffold ready.\n`));
}
