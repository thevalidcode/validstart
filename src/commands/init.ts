import inquirer from "inquirer";
const chalk = require("chalk");
import path from "path";
import { languageMap, frameworks, toolsAndLibs } from "../data/projectData";
import { scaffoldProject } from "../scaffolder/index";

import { generateGitignore } from "../utils/generators/gitignore";
import { generateReadme } from "../utils/generators/readme";
import { generateLicense } from "../utils/generators/license";
import { generateEnv } from "../utils/generators/env";
import { generateInstallScript } from "../utils/generators/installScript";

export async function runInitCommand(): Promise<void> {
  console.log(chalk.cyan("\n🚀 Welcome to ValidStart Setup!\n"));

  // Ask for project name
  const { projectName } = await inquirer.prompt([
    {
      type: "input",
      name: "projectName",
      message: "What is the name of your project?",
      validate: (input) => input.trim().toLowerCase() !== "" || "Project name cannot be empty.",
    },
  ]);

  // Ask for project type
  const { projectType } = await inquirer.prompt([
    {
      type: "list",
      name: "projectType",
      message: "What type of project do you want to create?",
      choices: Object.keys(languageMap),
    },
  ]);

  // Ask for language
  const languages = languageMap[projectType];
  const { language } = await inquirer.prompt([
    {
      type: "list",
      name: "language",
      message: `Select a language for your ${projectType.toLowerCase()} project:`,
      choices: languages,
    },
  ]);

  // Ask for framework
  const frameworkOptions = frameworks[projectType]?.[language] || [];
  const { framework } = await inquirer.prompt([
    {
      type: "list",
      name: "framework",
      message: `Select a main framework for ${language}:`,
      choices: frameworkOptions.length ? frameworkOptions : ["None"],
    },
  ]);

  // Ask for extra tools/libs
  const tools = toolsAndLibs[language] || [];
  const { selectedTools } = await inquirer.prompt([
    {
      type: "checkbox",
      name: "selectedTools",
      message: `Select additional tools/libraries to include:`,
      choices: tools.length ? tools : ["None"],
    },
  ]);

  // Ask if user wants to include extras
  const { includeExtras } = await inquirer.prompt([
    {
      type: "confirm",
      name: "includeExtras",
      message: "Include .gitignore, README.md, LICENSE, .env, and install.sh?",
      default: true,
    },
  ]);

  // Show summary
  console.log(chalk.green("\n✅ Setup Summary:"));
  console.log(`📦 Project Name: ${chalk.bold(projectName)}`);
  console.log(`📂 Project Type: ${chalk.bold(projectType)}`);
  console.log(`💻 Language: ${chalk.bold(language)}`);
  console.log(`🧱 Framework: ${chalk.bold(framework)}`);
  console.log(`🧰 Tools/Libraries: ${chalk.bold(selectedTools.join(", ") || "None")}\n`);

  // Scaffold the main project files
  await scaffoldProject({
    projectName,
    projectType,
    language,
    framework,
    selectedTools,
  });

  // Generate extra files (after scaffolding)
  if (includeExtras) {
    const projectPath = path.resolve(process.cwd(), projectName);

    await generateGitignore(projectPath, language);
    await generateReadme(projectPath, projectName);
    await generateLicense(projectPath, "Your Name");
    await generateEnv(projectPath);

    const installCommand =
      language === "Python"
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

    await generateInstallScript(projectPath, [installCommand]);
  }

  console.log(chalk.cyan(`\n🎉 ${chalk.bold("ValidStart")} setup complete!`));
}
