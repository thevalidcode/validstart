"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateReadme = generateReadme;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
async function generateReadme(projectPath, projectName, description = "") {
    const content = `# ${projectName}\n\n${description || "A new project scaffolded with ValidStart."}\n`;
    await fs_extra_1.default.writeFile(path_1.default.join(projectPath, "README.md"), content);
}
