"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runInitCommand = runInitCommand;
const inquirer_1 = __importDefault(require("inquirer"));
const chalk_1 = __importDefault(require("chalk"));
const path_1 = __importDefault(require("path"));
const projectData_1 = require("../data/projectData");
const index_1 = require("../scaffolder/index");
const gitignore_1 = require("../utils/generators/gitignore");
const readme_1 = require("../utils/generators/readme");
const license_1 = require("../utils/generators/license");
const env_1 = require("../utils/generators/env");
const installScript_1 = require("../utils/generators/installScript");
async function runInitCommand() {
    console.log(chalk_1.default.cyan("\n🚀 Welcome to ValidStart Setup!\n"));
    // Ask for project name
    const { projectName } = await inquirer_1.default.prompt([
        {
            type: "input",
            name: "projectName",
            message: "What is the name of your project?",
            validate: (input) => input.trim().toLowerCase() !== "" || "Project name cannot be empty.",
        },
    ]);
    // Ask for project type
    const { projectType } = await inquirer_1.default.prompt([
        {
            type: "list",
            name: "projectType",
            message: "What type of project do you want to create?",
            choices: Object.keys(projectData_1.languageMap),
        },
    ]);
    // Ask for language
    const languages = projectData_1.languageMap[projectType];
    const { language } = await inquirer_1.default.prompt([
        {
            type: "list",
            name: "language",
            message: `Select a language for your ${projectType.toLowerCase()} project:`,
            choices: languages,
        },
    ]);
    // Ask for framework
    const frameworkOptions = projectData_1.frameworks[projectType]?.[language] || [];
    const { framework } = await inquirer_1.default.prompt([
        {
            type: "list",
            name: "framework",
            message: `Select a main framework for ${language}:`,
            choices: frameworkOptions.length ? frameworkOptions : ["None"],
        },
    ]);
    // Ask for extra tools/libs
    const tools = projectData_1.toolsAndLibs[language] || [];
    const { selectedTools } = await inquirer_1.default.prompt([
        {
            type: "checkbox",
            name: "selectedTools",
            message: `Select additional tools/libraries to include:`,
            choices: tools.length ? tools : ["None"],
        },
    ]);
    // Ask if user wants to include extras
    const { includeExtras } = await inquirer_1.default.prompt([
        {
            type: "confirm",
            name: "includeExtras",
            message: "Include .gitignore, README.md, LICENSE, .env, and install.sh?",
            default: true,
        },
    ]);
    // Show summary
    console.log(chalk_1.default.green("\n✅ Setup Summary:"));
    console.log(`📦 Project Name: ${chalk_1.default.bold(projectName)}`);
    console.log(`📂 Project Type: ${chalk_1.default.bold(projectType)}`);
    console.log(`💻 Language: ${chalk_1.default.bold(language)}`);
    console.log(`🧱 Framework: ${chalk_1.default.bold(framework)}`);
    console.log(`🧰 Tools/Libraries: ${chalk_1.default.bold(selectedTools.join(", ") || "None")}\n`);
    // Scaffold the main project files
    await (0, index_1.scaffoldProject)({
        projectName,
        projectType,
        language,
        framework,
        selectedTools,
    });
    // Generate extra files (after scaffolding)
    if (includeExtras) {
        const projectPath = path_1.default.resolve(process.cwd(), projectName);
        await (0, gitignore_1.generateGitignore)(projectPath, language);
        await (0, readme_1.generateReadme)(projectPath, projectName);
        await (0, license_1.generateLicense)(projectPath, "Your Name");
        await (0, env_1.generateEnv)(projectPath);
        const installCommand = language === "Python"
            ? "pip install -r requirements.txt"
            : language === "Rust"
                ? "cargo build"
                : language === "Go"
                    ? "go mod tidy"
                    : language === "Java"
                        ? "./gradlew build"
                        : language === "PHP"
                            ? "composer install"
                            : "npm install";
        await (0, installScript_1.generateInstallScript)(projectPath, [installCommand]);
    }
    console.log(chalk_1.default.cyan(`\n🎉 ${chalk_1.default.bold("ValidStart")} setup complete!`));
}
