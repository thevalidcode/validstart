import fs from "fs-extra";
import path from "path";
import chalk from "chalk";

export async function scaffoldCLIToolPython({ projectName }: any): Promise<void> {
  const projectPath = path.resolve(process.cwd(), projectName);
  await fs.mkdirp(projectPath);

  const code = `import click\n\n@click.command()\ndef hello():\n    click.echo("Hello from Python CLI!")\n\nif __name__ == "__main__":\n    hello()\n`;

  await fs.writeFile(path.join(projectPath, "main.py"), code);

  console.log(chalk.green(`✅ Python CLI tool '${projectName}' created with Click.`));
}
