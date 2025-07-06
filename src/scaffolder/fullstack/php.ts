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

export async function scaffoldFullstackPHP(options: Options): Promise<void> {
  const { projectName } = options;
  const projectPath = path.resolve(process.cwd(), projectName);

  console.log(chalk.cyan(`\n🐘 Creating PHP fullstack project with Laravel + Vue`));
  await execa("composer", ["create-project", "--prefer-dist", "laravel/laravel", projectName], {
    stdio: "inherit",
  });

  const vueCmd = `npm install && npm install vue@next vue-loader@next && echo "Vue setup done"`;
  await execa("bash", ["-c", vueCmd], { cwd: projectPath });

  await execa("git", ["init"], { cwd: projectPath });
  console.log(chalk.green(`\n✅ Laravel + Vue fullstack scaffold created.`));
}
