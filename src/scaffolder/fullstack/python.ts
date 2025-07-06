import fs from "fs-extra";
import path from "path";
const chalk = require("chalk");

import { execa } from "execa";

interface Options {
  projectName: string;
  projectType: string;
  language: string;
  framework: string;
  selectedTools: string[];
}

export async function scaffoldFullstackPython(options: Options): Promise<void> {
  const { projectName, framework } = options;
  const projectPath = path.resolve(process.cwd(), projectName);

  console.log(chalk.cyan(`\n🐍 Creating Python fullstack project with ${chalk.bold(framework)}`));
  await fs.mkdirp(projectPath);

  if (framework.includes("Django")) {
    await execa("django-admin", ["startproject", projectName], { cwd: path.dirname(projectPath) });
    await execa("git", ["init"], { cwd: projectPath });
    return;
  }

  if (framework.includes("FastAPI")) {
    const backendPath = path.join(projectPath, "backend");
    const frontendPath = path.join(projectPath, "frontend");

    await fs.mkdirp(backendPath);
    await fs.mkdirp(frontendPath);

    await fs.writeFile(
      path.join(backendPath, "main.py"),
      `from fastapi import FastAPI\n\napp = FastAPI()\n\n@app.get("/")\ndef root():\n    return {"msg": "FastAPI backend running"}\n`,
    );

    await execa("npm", ["create", "vite@latest", "frontend", "--", "--template", "vanilla"], {
      cwd: projectPath,
      stdio: "inherit",
    });

    await execa("git", ["init"], { cwd: projectPath });
  }

  console.log(
    chalk.green(`\n✅ Python fullstack project '${projectName}' created at ${projectPath}\n`),
  );
}
