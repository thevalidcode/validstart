"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scaffoldBackendRust = scaffoldBackendRust;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const chalk_1 = __importDefault(require("chalk"));
;
const execa_1 = require("execa");
;
async function scaffoldBackendRust(options) {
    const { projectName, framework } = options;
    const projectPath = path_1.default.resolve(process.cwd(), projectName);
    console.log(chalk_1.default.cyan(`\n🦀 Creating Rust backend project with ${chalk_1.default.bold(framework)}`));
    await (0, execa_1.execa)("cargo", ["new", projectName, "--bin"]);
    const mainPath = path_1.default.join(projectPath, "src", "main.rs");
    await fs_extra_1.default.writeFile(mainPath, getRustTemplate(framework));
    const cargoToml = path_1.default.join(projectPath, "Cargo.toml");
    await fs_extra_1.default.appendFile(cargoToml, getRustDependencies(framework));
    console.log(chalk_1.default.gray("🔧 Initializing git..."));
    await (0, execa_1.execa)("git", ["init"], { cwd: projectPath });
    console.log(chalk_1.default.green(`\n✅ Rust project '${projectName}' created at ${projectPath}\n`));
}
function getRustTemplate(framework) {
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
function getRustDependencies(framework) {
    switch (framework.toLowerCase()) {
        case "actix":
            return `\n[dependencies]\nactix-web = "4"\n`;
        case "rocket":
            return `\n[dependencies]\nrocket = { version = "0.5.0-rc.2", features = ["json"] }\n`;
        default:
            return "";
    }
}
