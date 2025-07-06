"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scaffoldLibTS = scaffoldLibTS;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const chalk_1 = __importDefault(require("chalk"));
;
async function scaffoldLibTS({ projectName }) {
    const projectPath = path_1.default.resolve(process.cwd(), projectName);
    await fs_extra_1.default.mkdirp(projectPath);
    const pkg = {
        name: projectName,
        version: "1.0.0",
        main: "dist/index.js",
        types: "dist/index.d.ts",
        scripts: {
            build: "tsup src/index.ts --dts",
            test: "vitest",
        },
        devDependencies: {
            tsup: "^7.0.0",
            typescript: "^5.0.0",
            vitest: "^1.0.0",
        },
    };
    const tsconfig = {
        compilerOptions: {
            target: "ESNext",
            module: "ESNext",
            moduleResolution: "Node",
            strict: true,
            declaration: true,
            outDir: "dist",
            esModuleInterop: true,
        },
        include: ["src"],
    };
    await fs_extra_1.default.writeJson(path_1.default.join(projectPath, "package.json"), pkg, { spaces: 2 });
    await fs_extra_1.default.writeJson(path_1.default.join(projectPath, "tsconfig.json"), tsconfig, { spaces: 2 });
    await fs_extra_1.default.outputFile(path_1.default.join(projectPath, "src/index.ts"), `export const hello = () => "Hello from TS library";`);
    console.log(chalk_1.default.green(`✅ TypeScript library '${projectName}' created.`));
}
