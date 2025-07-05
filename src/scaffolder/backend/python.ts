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

export async function scaffoldBackendPython(options: Options): Promise<void> {
  const { projectName, framework, selectedTools } = options;
  const projectPath = path.resolve(process.cwd(), projectName);

  await fs.mkdirp(projectPath);
  console.log(chalk.cyan(`\n🐍 Creating Python backend project with ${chalk.bold(framework)}`));

  const appFile = getPythonTemplate(framework);
  const entryFile = framework === "django" ? "" : "main.py";
  if (entryFile) await fs.writeFile(path.join(projectPath, entryFile), appFile);

  await fs.writeFile(
    path.join(projectPath, "requirements.txt"),
    getPythonRequirements(framework, selectedTools).join("\n"),
  );

  console.log(chalk.gray("🐚 Creating virtual environment..."));
  await execa("python3", ["-m", "venv", ".venv"], { cwd: projectPath });

  console.log(chalk.gray("🔧 Initializing git..."));
  await execa("git", ["init"], { cwd: projectPath });

  console.log(chalk.green(`\n✅ Python project '${projectName}' created at ${projectPath}\n`));
}

function getPythonTemplate(framework: string): string {
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

function getPythonRequirements(framework: string, tools: string[]): string[] {
  const deps: string[] = [];

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
    if (supported.includes(tool)) deps.push(tool);
  }

  return deps;
}
