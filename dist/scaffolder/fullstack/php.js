"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scaffoldFullstackPHP = scaffoldFullstackPHP;
const path_1 = __importDefault(require("path"));
const chalk_1 = __importDefault(require("chalk"));
const execa_1 = require("execa");
async function scaffoldFullstackPHP(options) {
    const { projectName } = options;
    const projectPath = path_1.default.resolve(process.cwd(), projectName);
    console.log(chalk_1.default.cyan(`\n🐘 Creating PHP fullstack project with Laravel + Vue`));
    await (0, execa_1.execa)("composer", ["create-project", "--prefer-dist", "laravel/laravel", projectName], {
        stdio: "inherit",
    });
    const vueCmd = `npm install && npm install vue@next vue-loader@next && echo "Vue setup done"`;
    await (0, execa_1.execa)("bash", ["-c", vueCmd], { cwd: projectPath });
    await (0, execa_1.execa)("git", ["init"], { cwd: projectPath });
    console.log(chalk_1.default.green(`\n✅ Laravel + Vue fullstack scaffold created.`));
}
