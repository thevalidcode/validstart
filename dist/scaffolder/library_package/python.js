"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scaffoldLibPython = scaffoldLibPython;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const chalk_1 = __importDefault(require("chalk"));
;
async function scaffoldLibPython({ projectName }) {
    const projectPath = path_1.default.resolve(process.cwd(), projectName);
    const srcPath = path_1.default.join(projectPath, projectName.replace(/-/g, "_"));
    await fs_extra_1.default.mkdirp(srcPath);
    await fs_extra_1.default.writeFile(path_1.default.join(srcPath, "__init__.py"), `def hello():\n    return "Hello from Python library"`);
    await fs_extra_1.default.writeFile(path_1.default.join(projectPath, "pyproject.toml"), `[tool.poetry]\nname = "${projectName}"\nversion = "0.1.0"\ndescription = ""\nauthors = ["you <you@example.com>"]\n\n[tool.poetry.dependencies]\npython = "^3.8"\n\n[build-system]\nrequires = ["poetry-core"]\nbuild-backend = "poetry.core.masonry.api"`);
    console.log(chalk_1.default.green(`✅ Python library '${projectName}' created with Poetry.`));
}
