import inquirer from "inquirer";
import chalk from "chalk";
import { languageMap, frameworks, toolsAndLibs } from "../data/projectData";
import { scaffoldProject } from "../scaffolder/index";

export async function runInitCommand(): Promise<void> {
  console.log(chalk.cyan("\n🚀 Welcome to Validstart Setup!\n"));

  const { projectName } = await inquirer.prompt([
    {
      type: "input",
      name: "projectName",
      message: "What is the name of your project?",
      validate: (input) =>
        input.trim().toLocaleLowerCase() !== "" || "Project name cannot be empty.",
    },
  ]);

  const { projectType } = await inquirer.prompt([
    {
      type: "list",
      name: "projectType",
      message: "What type of project do you want to create?",
      choices: Object.keys(languageMap),
    },
  ]);

  const languages = languageMap[projectType];
  const { language } = await inquirer.prompt([
    {
      type: "list",
      name: "language",
      message: `Select a language for your ${projectType.toLowerCase()} project:`,
      choices: languages,
    },
  ]);

  const frameworkOptions = frameworks[projectType]?.[language] || [];
  const { framework } = await inquirer.prompt([
    {
      type: "list",
      name: "framework",
      message: `Select a main framework for ${language}:`,
      choices: frameworkOptions.length ? frameworkOptions : ["None"],
    },
  ]);

  const tools = toolsAndLibs[language] || [];
  const { selectedTools } = await inquirer.prompt([
    {
      type: "checkbox",
      name: "selectedTools",
      message: `Select additional tools/libraries to include:`,
      choices: tools.length ? tools : ["None"],
    },
  ]);

  console.log(chalk.green("\n✅ Setup Summary:"));
  console.log(`📦 Project Name: ${chalk.bold(projectName)}`);
  console.log(`📂 Project Type: ${chalk.bold(projectType)}`);
  console.log(`💻 Language: ${chalk.bold(language)}`);
  console.log(`🧱 Framework: ${chalk.bold(framework)}`);
  console.log(`🧰 Tools/Libraries: ${chalk.bold(selectedTools.join(", ") || "None")}\n`);

  await scaffoldProject({
    projectName,
    projectType,
    language,
    framework,
    selectedTools,
  });
}
