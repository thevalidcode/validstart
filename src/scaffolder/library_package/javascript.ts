import fs from "fs-extra";
import path from "path";
const chalk = require("chalk");


export async function scaffoldLibJS({ projectName }: any): Promise<void> {
  const projectPath = path.resolve(process.cwd(), projectName);
  await fs.mkdirp(projectPath);

  const pkg = {
    name: projectName,
    version: "1.0.0",
    main: "dist/index.js",
    scripts: {
      build: "rollup -c",
      test: "jest",
    },
    devDependencies: {
      rollup: "^3.0.0",
      jest: "^29.0.0",
    },
  };

  await fs.writeJson(path.join(projectPath, "package.json"), pkg, { spaces: 2 });
  await fs.outputFile(
    path.join(projectPath, "src/index.js"),
    `export function hello() {\n  return "Hello from JS library";\n}`,
  );

  await fs.outputFile(
    path.join(projectPath, "rollup.config.js"),
    `export default {\n  input: "src/index.js",\n  output: {\n    file: "dist/index.js",\n    format: "cjs"\n  }\n};`,
  );

  console.log(chalk.green(`✅ JavaScript library '${projectName}' created.`));
}
