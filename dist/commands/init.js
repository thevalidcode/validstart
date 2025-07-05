"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runInitCommand = runInitCommand;
const inquirer_1 = __importDefault(require("inquirer"));
const chalk_1 = __importDefault(require("chalk"));
const projectData_1 = require("../data/projectData");
const index_1 = require("../scaffolder/index");
async function runInitCommand() {
    console.log(chalk_1.default.cyan("\n🚀 Welcome to Validstart Setup!\n"));
    const { projectName } = await inquirer_1.default.prompt([
        {
            type: "input",
            name: "projectName",
            message: "What is the name of your project?",
            validate: (input) => input.trim().toLocaleLowerCase() !== "" || "Project name cannot be empty.",
        },
    ]);
    const { projectType } = await inquirer_1.default.prompt([
        {
            type: "list",
            name: "projectType",
            message: "What type of project do you want to create?",
            choices: Object.keys(projectData_1.languageMap),
        },
    ]);
    const languages = projectData_1.languageMap[projectType];
    const { language } = await inquirer_1.default.prompt([
        {
            type: "list",
            name: "language",
            message: `Select a language for your ${projectType.toLowerCase()} project:`,
            choices: languages,
        },
    ]);
    const frameworkOptions = projectData_1.frameworks[projectType]?.[language] || [];
    const { framework } = await inquirer_1.default.prompt([
        {
            type: "list",
            name: "framework",
            message: `Select a main framework for ${language}:`,
            choices: frameworkOptions.length ? frameworkOptions : ["None"],
        },
    ]);
    const tools = projectData_1.toolsAndLibs[language] || [];
    const { selectedTools } = await inquirer_1.default.prompt([
        {
            type: "checkbox",
            name: "selectedTools",
            message: `Select additional tools/libraries to include:`,
            choices: tools.length ? tools : ["None"],
        },
    ]);
    console.log(chalk_1.default.green("\n✅ Setup Summary:"));
    console.log(`📦 Project Name: ${chalk_1.default.bold(projectName)}`);
    console.log(`📂 Project Type: ${chalk_1.default.bold(projectType)}`);
    console.log(`💻 Language: ${chalk_1.default.bold(language)}`);
    console.log(`🧱 Framework: ${chalk_1.default.bold(framework)}`);
    console.log(`🧰 Tools/Libraries: ${chalk_1.default.bold(selectedTools.join(", ") || "None")}\n`);
    await (0, index_1.scaffoldProject)({
        projectName,
        projectType,
        language,
        framework,
        selectedTools,
    });
}
