import fs from "fs-extra";
import path from "path";
const chalk = require("chalk");


export async function scaffoldLibJava({ projectName }: any): Promise<void> {
  const base = path.resolve(process.cwd(), projectName);
  const srcDir = path.join(
    base,
    "src",
    "main",
    "java",
    "com",
    "example",
    projectName.toLowerCase(),
  );
  await fs.mkdirp(srcDir);

  await fs.outputFile(
    path.join(srcDir, "Main.java"),
    `package com.example.${projectName.toLowerCase()};\n\npublic class Main {\n    public static String hello() {\n        return "Hello from Java library";\n    }\n}`,
  );

  await fs.outputFile(
    path.join(base, "build.gradle"),
    `plugins {\n    id 'java'\n}\n\ngroup = 'com.example'\nversion = '1.0.0'\n\nrepositories {\n    mavenCentral()\n}\n\ndependencies {\n    // add dependencies here\n}`,
  );

  console.log(chalk.green(`✅ Java library '${projectName}' scaffolded with Gradle.`));
}
