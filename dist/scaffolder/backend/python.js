"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scaffoldBackendPython = scaffoldBackendPython;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const chalk = require("chalk");
const execa_1 = require("execa");
async function scaffoldBackendPython(options) {
    const { projectName, framework, selectedTools } = options;
    const projectPath = path_1.default.resolve(process.cwd(), projectName);
    await fs_extra_1.default.mkdirp(projectPath);
    console.log(chalk.cyan(`\n🐍 Creating Python backend project with ${chalk.bold(framework)}`));
    const appFile = getPythonTemplate(framework);
    const entryFile = framework === "django" ? "" : "main.py";
    if (entryFile)
        await fs_extra_1.default.writeFile(path_1.default.join(projectPath, entryFile), appFile);
    await fs_extra_1.default.writeFile(path_1.default.join(projectPath, "requirements.txt"), getPythonRequirements(framework, selectedTools).join("\n"));
    console.log(chalk.gray("🐚 Creating virtual environment..."));
    await (0, execa_1.execa)("python3", ["-m", "venv", ".venv"], { cwd: projectPath });
    console.log(chalk.gray("🔧 Initializing git..."));
    await (0, execa_1.execa)("git", ["init"], { cwd: projectPath });
    console.log(chalk.green(`\n✅ Python project '${projectName}' created at ${projectPath}\n`));
}
function getPythonTemplate(framework) {
    switch (framework.toLowerCase()) {
        case "fastapi":
            return `from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Hello from FastAPI!"}
`;
        case "flask":
            return `from flask import Flask

app = Flask(__name__)

@app.route("/")
def hello():
    return "Hello from Flask!"
    
if __name__ == "__main__":
    app.run(port=5000)
`;
        case "django":
            return ""; // Django creates its own layout
        default:
            return `print("No framework selected.")`;
    }
}
function getPythonRequirements(framework, tools) {
    const deps = [];
    switch (framework.toLowerCase()) {
        case "fastapi":
            deps.push("fastapi", "uvicorn");
            break;
        case "flask":
            deps.push("flask");
            break;
        case "django":
            deps.push("django");
            break;
    }
    const supported = ["pydantic", "sqlalchemy", "httpx", "requests", "black", "pytest"];
    for (const tool of tools) {
        if (supported.includes(tool))
            deps.push(tool);
    }
    return deps;
}
