"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateInstallScript = generateInstallScript;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
async function generateInstallScript(projectPath, commands) {
    const script = `#!/bin/bash\n\n${commands.join("\n")}\n`;
    const fullPath = path_1.default.join(projectPath, "install.sh");
    await fs_extra_1.default.writeFile(fullPath, script);
    await fs_extra_1.default.chmod(fullPath, 0o755); // Make executable
}
