"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scaffoldFullstackJS = scaffoldFullstackJS;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const chalk_1 = __importDefault(require("chalk"));
;
const execa_1 = require("execa");
;
async function scaffoldFullstackJS(options) {
    const { projectName, framework } = options;
    const projectPath = path_1.default.resolve(process.cwd(), projectName);
    console.log(chalk_1.default.cyan(`\n🌐 Creating JavaScript fullstack project with ${chalk_1.default.bold(framework)}`));
    await fs_extra_1.default.mkdirp(projectPath);
    switch (framework.toLowerCase()) {
        case "next.js":
        case "remix":
            await (0, execa_1.execa)("npx", ["create-" + framework.split(".")[0].toLowerCase() + "-app", ".", "--js"], {
                cwd: projectPath,
                stdio: "inherit",
            });
            break;
        case "meteor":
            await (0, execa_1.execa)("npx", ["create", projectName], {
                stdio: "inherit",
            });
            return; // Meteor sets its own folder
    }
    await (0, execa_1.execa)("git", ["init"], { cwd: projectPath });
    console.log(chalk_1.default.green(`\n✅ JavaScript fullstack project '${projectName}' created at ${projectPath}\n`));
}
