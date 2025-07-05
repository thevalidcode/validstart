"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateEnv = generateEnv;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
async function generateEnv(projectPath, keys = ["PORT=3000", "API_KEY="]) {
    await fs_extra_1.default.writeFile(path_1.default.join(projectPath, ".env"), keys.join("\n"));
}
