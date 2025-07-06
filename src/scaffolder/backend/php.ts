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

export async function scaffoldBackendPHP(options: Options): Promise<void> {
  const { projectName, framework } = options;
  const projectPath = path.resolve(process.cwd(), projectName);

  console.log(chalk.cyan(`\n🐘 Creating PHP backend project with ${chalk.bold(framework)}`));

  if (framework.toLowerCase() === "laravel") {
    await execa("composer", ["create-project", "--prefer-dist", "laravel/laravel", projectName], {
      stdio: "inherit",
    });
  } else if (framework.toLowerCase() === "symfony") {
    await execa("composer", ["create-project", "symfony/skeleton", projectName], {
      stdio: "inherit",
    });
  } else {
    await fs.mkdirp(projectPath);
    await fs.writeFile(path.join(projectPath, "index.php"), `<?php echo "Hello from PHP!"; ?>`);
  }

  console.log(chalk.gray("🔧 Initializing git..."));
  await execa("git", ["init"], { cwd: projectPath });

  console.log(chalk.green(`\n✅ PHP project '${projectName}' created at ${projectPath}\n`));
}
