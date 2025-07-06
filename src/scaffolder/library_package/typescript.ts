import fs from "fs-extra";
import path from "path";
const chalk = require("chalk");


export async function scaffoldLibTS({ projectName }: any): Promise<void> {
  const projectPath = path.resolve(process.cwd(), projectName);
  await fs.mkdirp(projectPath);

  const pkg = {
    name: projectName,
    version: "1.0.0",
    main: "dist/index.js",
    types: "dist/index.d.ts",
    scripts: {
      build: "tsup src/index.ts --dts",
      test: "vitest",
    },
    devDependencies: {
      tsup: "^7.0.0",
      typescript: "^5.0.0",
      vitest: "^1.0.0",
    },
  };

  const tsconfig = {
    compilerOptions: {
      target: "ESNext",
      module: "ESNext",
      moduleResolution: "Node",
      strict: true,
      declaration: true,
      outDir: "dist",
      esModuleInterop: true,
    },
    include: ["src"],
  };

  await fs.writeJson(path.join(projectPath, "package.json"), pkg, { spaces: 2 });
  await fs.writeJson(path.join(projectPath, "tsconfig.json"), tsconfig, { spaces: 2 });
  await fs.outputFile(
    path.join(projectPath, "src/index.ts"),
    `export const hello = () => "Hello from TS library";`,
  );

  console.log(chalk.green(`✅ TypeScript library '${projectName}' created.`));
}
