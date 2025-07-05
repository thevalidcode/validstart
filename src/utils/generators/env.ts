import fs from "fs-extra";
import path from "path";

export async function generateEnv(projectPath: string, keys: string[] = ["PORT=3000", "API_KEY="]) {
  await fs.writeFile(path.join(projectPath, ".env"), keys.join("\n"));
}
