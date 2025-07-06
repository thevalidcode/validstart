"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scaffoldLibJS = scaffoldLibJS;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const chalk = require("chalk");
async function scaffoldLibJS({ projectName }) {
    const projectPath = path_1.default.resolve(process.cwd(), projectName);
    await fs_extra_1.default.mkdirp(projectPath);
    const pkg = {
        name: projectName,
        version: "1.0.0",
        main: "dist/index.js",
        scripts: {
            build: "rollup -c",
            test: "jest",
        },
        devDependencies: {
            rollup: "^3.0.0",
            jest: "^29.0.0",
        },
    };
    await fs_extra_1.default.writeJson(path_1.default.join(projectPath, "package.json"), pkg, { spaces: 2 });
    await fs_extra_1.default.outputFile(path_1.default.join(projectPath, "src/index.js"), `export function hello() {\n  return "Hello from JS library";\n}`);
    await fs_extra_1.default.outputFile(path_1.default.join(projectPath, "rollup.config.js"), `export default {\n  input: "src/index.js",\n  output: {\n    file: "dist/index.js",\n    format: "cjs"\n  }\n};`);
    console.log(chalk.green(`✅ JavaScript library '${projectName}' created.`));
}
