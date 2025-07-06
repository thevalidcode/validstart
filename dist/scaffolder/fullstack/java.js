"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scaffoldFullstackJava = scaffoldFullstackJava;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const chalk_1 = __importDefault(require("chalk"));
;
async function scaffoldFullstackJava(options) {
    const { projectName } = options;
    const projectPath = path_1.default.resolve(process.cwd(), projectName);
    console.log(chalk_1.default.cyan(`\n☕ Creating Java fullstack project with Spring + Thymeleaf`));
    await fs_extra_1.default.mkdirp(path_1.default.join(projectPath, "src"));
    // You can expand this by using Spring Initializr API later
    await fs_extra_1.default.writeFile(path_1.default.join(projectPath, "README.md"), `# ${projectName}\nSpring Boot + Thymeleaf starter`);
    await fs_extra_1.default.writeFile(path_1.default.join(projectPath, "index.txt"), `You can generate Spring Boot project using Spring Initializr: https://start.spring.io/`);
    console.log(chalk_1.default.green(`\n✅ Java Spring fullstack scaffold prepared. Manually download Spring ZIP if needed.`));
}
