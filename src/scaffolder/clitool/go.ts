import fs from "fs-extra";
import path from "path";
const chalk = require("chalk");

import { execa } from "execa";

export async function scaffoldCLIToolGo({ projectName }: any): Promise<void> {
  const projectPath = path.resolve(process.cwd(), projectName);
  await fs.mkdirp(projectPath);

  await execa("go", ["mod", "init", projectName], { cwd: projectPath });

  const code = `package main\n\nimport (\n\t"fmt"\n\t"github.com/spf13/cobra"\n)\n\nfunc main() {\n\tvar rootCmd = &cobra.Command{\n\t\tUse:   "${projectName}",\n\t\tShort: "A CLI tool",\n\t\tRun: func(cmd *cobra.Command, args []string) {\n\t\t\tfmt.Println("Hello from Go CLI!")\n\t\t},\n\t}\n\trootCmd.Execute()\n}\n`;

  await fs.writeFile(path.join(projectPath, "main.go"), code);
  console.log(chalk.green(`✅ Go CLI tool '${projectName}' scaffolded.`));
}
