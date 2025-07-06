import fs from "fs-extra";
import path from "path";
import chalk from "chalk";;


export async function scaffoldLibPython({ projectName }: any): Promise<void> {
  const projectPath = path.resolve(process.cwd(), projectName);
  const srcPath = path.join(projectPath, projectName.replace(/-/g, "_"));
  await fs.mkdirp(srcPath);

  await fs.writeFile(
    path.join(srcPath, "__init__.py"),
    `def hello():\n    return "Hello from Python library"`,
  );

  await fs.writeFile(
    path.join(projectPath, "pyproject.toml"),
    `[tool.poetry]\nname = "${projectName}"\nversion = "0.1.0"\ndescription = ""\nauthors = ["you <you@example.com>"]\n\n[tool.poetry.dependencies]\npython = "^3.8"\n\n[build-system]\nrequires = ["poetry-core"]\nbuild-backend = "poetry.core.masonry.api"`,
  );

  console.log(chalk.green(`✅ Python library '${projectName}' created with Poetry.`));
}
