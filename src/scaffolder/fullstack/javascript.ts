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
  const { projectName, framework } = options;
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

  await execa("git", ["init"], { cwd: projectPath });
  console.log(
    chalk.green(`\n✅ JavaScript fullstack project '${projectName}' created at ${projectPath}\n`),
  );
}
