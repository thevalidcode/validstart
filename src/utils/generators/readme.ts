import fs from "fs-extra";
import path from "path";

export async function generateReadme(projectPath: string, projectName: string, description = "") {
  const content = `# ${projectName}\n\n${description || "A new project scaffolded with ValidStart."}\n`;
  await fs.writeFile(path.join(projectPath, "README.md"), content);
}
