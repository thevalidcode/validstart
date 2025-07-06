import fs from "fs-extra";
import path from "path";
const chalk = require("chalk");

const execa = require("execa");

export async function scaffoldCLIToolTS({ projectName }: any): Promise<void> {
  const projectPath = path.resolve(process.cwd(), projectName);
  await fs.mkdirp(projectPath);

  await execa("npm", ["init", "-y"], { cwd: projectPath });
  await execa("npm", ["install", "oclif", "typescript", "ts-node", "@oclif/core"], {
    cwd: projectPath,
    stdio: "inherit",
  });

  const srcDir = path.join(projectPath, "src");
  await fs.mkdirp(srcDir);
  await fs.writeFile(
    path.join(srcDir, "index.ts"),
    `import { Command, Flags } from '@oclif/core';\n\nclass Hello extends Command {\n  async run() {\n    this.log("Hello CLI in TS!");\n  }\n}\n\nexport = Hello;`,
  );

  console.log(chalk.green(`✅ TypeScript CLI project '${projectName}' scaffolded.`));
}
