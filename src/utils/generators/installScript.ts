import fs from "fs-extra";
import path from "path";

export async function generateInstallScript(projectPath: string, commands: string[]) {
  const script = `#!/bin/bash\n\n${commands.join("\n")}\n`;
  const fullPath = path.join(projectPath, "install.sh");
  await fs.writeFile(fullPath, script);
  await fs.chmod(fullPath, 0o755); // Make executable
}
