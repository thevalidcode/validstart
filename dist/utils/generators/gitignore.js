"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateGitignore = generateGitignore;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
async function generateGitignore(projectPath, language) {
    const templates = {
        javascript: ["node_modules/", "dist/", ".env"],
        typescript: ["node_modules/", "dist/", ".env"],
        python: ["__pycache__/", "*.pyc", ".env"],
        go: ["bin/", "*.exe", ".env"],
        rust: ["target/", ".env"],
        java: ["target/", "*.class", ".env"],
        php: ["vendor/", ".env"],
    };
    const lines = templates[language.toLowerCase()] || ["*.log", ".env"];
    await fs_extra_1.default.writeFile(path_1.default.join(projectPath, ".gitignore"), lines.join("\n"));
}
