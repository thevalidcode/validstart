const execa = require("execa");
import path from "path";
const chalk = require("chalk");

import fs from "fs-extra";

export async function scaffoldCLIToolRust({ projectName }: any): Promise<void> {
  const projectPath = path.resolve(process.cwd(), projectName);
  await execa("cargo", ["new", projectName, "--bin"], { stdio: "inherit" });

  const mainPath = path.join(projectPath, "src", "main.rs");
  const code = `use clap::Parser;\n\n#[derive(Parser)]\n#[command(name = "${projectName}")]\nstruct Cli {}\n\nfn main() {\n    println!("Hello from Rust CLI!");\n}`;

  await fs.writeFile(mainPath, code);
  console.log(chalk.green(`✅ Rust CLI tool '${projectName}' scaffolded.`));
}
