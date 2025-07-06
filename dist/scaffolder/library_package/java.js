"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scaffoldLibJava = scaffoldLibJava;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const chalk = require("chalk");
async function scaffoldLibJava({ projectName }) {
    const base = path_1.default.resolve(process.cwd(), projectName);
    const srcDir = path_1.default.join(base, "src", "main", "java", "com", "example", projectName.toLowerCase());
    await fs_extra_1.default.mkdirp(srcDir);
    await fs_extra_1.default.outputFile(path_1.default.join(srcDir, "Main.java"), `package com.example.${projectName.toLowerCase()};\n\npublic class Main {\n    public static String hello() {\n        return "Hello from Java library";\n    }\n}`);
    await fs_extra_1.default.outputFile(path_1.default.join(base, "build.gradle"), `plugins {\n    id 'java'\n}\n\ngroup = 'com.example'\nversion = '1.0.0'\n\nrepositories {\n    mavenCentral()\n}\n\ndependencies {\n    // add dependencies here\n}`);
    console.log(chalk.green(`✅ Java library '${projectName}' scaffolded with Gradle.`));
}
