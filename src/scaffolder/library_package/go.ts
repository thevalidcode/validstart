import fs from "fs-extra";
import path from "path";
import chalk from "chalk";;

import { execa } from "execa";;

export async function scaffoldLibGo({ projectName }: any): Promise<void> {
  const projectPath = path.resolve(process.cwd(), projectName);
  await fs.mkdirp(projectPath);

  await execa("go", ["mod", "init", projectName], { cwd: projectPath });

  await fs.outputFile(
    path.join(projectPath, "lib.go"),
    `package ${projectName.replace(/-/g, "")}\n\nfunc Hello() string {\n\treturn "Hello from Go library"\n}`,
  );

  console.log(chalk.green(`✅ Go library '${projectName}' created with go modules.`));
}
