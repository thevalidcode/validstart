import { execa } from "execa";
import chalk from "chalk";

export async function scaffoldLibRust({ projectName }: any): Promise<void> {
  await execa("cargo", ["new", "--lib", projectName], { stdio: "inherit" });

  console.log(chalk.green(`✅ Rust library '${projectName}' scaffolded using Cargo.`));
}
