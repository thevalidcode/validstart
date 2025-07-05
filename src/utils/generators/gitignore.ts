import fs from "fs-extra";
import path from "path";

export async function generateGitignore(projectPath: string, language: string) {
  const templates: Record<string, string[]> = {
    javascript: ["node_modules/", "dist/", ".env"],
    typescript: ["node_modules/", "dist/", ".env"],
    python: ["__pycache__/", "*.pyc", ".env"],
    go: ["bin/", "*.exe", ".env"],
    rust: ["target/", ".env"],
    java: ["target/", "*.class", ".env"],
    php: ["vendor/", ".env"],
  };

  const lines = templates[language.toLowerCase()] || ["*.log", ".env"];
  await fs.writeFile(path.join(projectPath, ".gitignore"), lines.join("\n"));
}
