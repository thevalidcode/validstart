import fs from "fs-extra";
import path from "path";
import chalk from "chalk";;


export async function scaffoldCLIToolJS({ projectName }: any): Promise<void> {
  const projectPath = path.resolve(process.cwd(), projectName);
  await fs.mkdirp(projectPath);

  const pkg = {
    name: projectName,
    version: "1.0.0",
    bin: {
      [projectName]: "./index.js",
    },
    dependencies: {
      commander: "^11.0.0",
    },
  };

  await fs.writeJson(path.join(projectPath, "package.json"), pkg, { spaces: 2 });

  await fs.writeFile(
    path.join(projectPath, "index.js"),
    `#!/usr/bin/env node\nconst { program } = require("commander");\n\nprogram.version("1.0.0");\nprogram.command("hello").action(() => console.log("Hello CLI"));\n\nprogram.parse();\n`,
  );

  await fs.chmod(path.join(projectPath, "index.js"), 0o755);

  console.log(chalk.green(`✅ JavaScript CLI project '${projectName}' scaffolded.`));
}
