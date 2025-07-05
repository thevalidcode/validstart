import fs from "fs-extra";
import path from "path";
import chalk from "chalk";
import { execa } from "execa";

interface Options {
  projectName: string;
  projectType: string;
  language: string;
  framework: string;
  selectedTools: string[];
}

export async function scaffoldBackendRust(options: Options): Promise<void> {
  const { projectName, framework } = options;
  const projectPath = path.resolve(process.cwd(), projectName);

  console.log(chalk.cyan(`\n🦀 Creating Rust backend project with ${chalk.bold(framework)}`));
  await execa("cargo", ["new", projectName, "--bin"]);

  const mainPath = path.join(projectPath, "src", "main.rs");
  await fs.writeFile(mainPath, getRustTemplate(framework));

  const cargoToml = path.join(projectPath, "Cargo.toml");
  await fs.appendFile(cargoToml, getRustDependencies(framework));

  console.log(chalk.gray("🔧 Initializing git..."));
  await execa("git", ["init"], { cwd: projectPath });

  console.log(chalk.green(`\n✅ Rust project '${projectName}' created at ${projectPath}\n`));
}

function getRustTemplate(framework: string): string {
  switch (framework.toLowerCase()) {
    case "actix":
      return `use actix_web::{get, App, HttpServer, Responder};

#[get("/")]
async fn hello() -> impl Responder {
    "Hello from Actix!"
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| App::new().service(hello))
        .bind("127.0.0.1:3000")?
        .run()
        .await
}
`;
    case "rocket":
      return `#[macro_use] extern crate rocket;

#[get("/")]
fn index() -> &'static str {
    "Hello from Rocket!"
}

#[launch]
fn rocket() -> _ {
    rocket::build().mount("/", routes![index])
}
`;
    default:
      return `fn main() {
    println!("No framework selected.");
}`;
  }
}

function getRustDependencies(framework: string): string {
  switch (framework.toLowerCase()) {
    case "actix":
      return `\n[dependencies]\nactix-web = "4"\n`;
    case "rocket":
      return `\n[dependencies]\nrocket = { version = "0.5.0-rc.2", features = ["json"] }\n`;
    default:
      return "";
  }
}
