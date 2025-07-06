import fs from "fs-extra";
import path from "path";
const chalk = require("chalk");

const execa = require("execa");

interface Options {
  projectName: string;
  projectType: string;
  language: string;
  framework: string;
  selectedTools: string[];
}

export async function scaffoldFullstackGo(options: Options): Promise<void> {
  const { projectName, framework } = options;
  const projectPath = path.resolve(process.cwd(), projectName);

  console.log(chalk.cyan(`\n🐹 Creating Go fullstack project with ${chalk.bold(framework)}`));

  if (framework === "Buffalo") {
    await execa("buffalo", ["new", projectName], { stdio: "inherit" });
    return;
  }

  const backend = path.join(projectPath, "backend");
  const frontend = path.join(projectPath, "frontend");
  await fs.mkdirp(backend);
  await fs.mkdirp(frontend);

  await fs.writeFile(
    path.join(backend, "main.go"),
    `package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Go backend running")\n}`,
  );

  await execa("npm", ["create", "vite@latest", "frontend", "--", "--template", "react"], {
    cwd: projectPath,
    stdio: "inherit",
  });

  await execa("git", ["init"], { cwd: projectPath });
  console.log(chalk.green(`\n✅ Go fullstack project '${projectName}' scaffolded\n`));
}
