"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scaffoldLibPHP = scaffoldLibPHP;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const chalk = require("chalk");
async function scaffoldLibPHP({ projectName }) {
    const base = path_1.default.resolve(process.cwd(), projectName);
    const srcPath = path_1.default.join(base, "src");
    await fs_extra_1.default.mkdirp(srcPath);
    const cleanName = projectName.replace(/[^a-zA-Z0-9]/g, "");
    const namespace = cleanName.charAt(0).toUpperCase() + cleanName.slice(1);
    const className = "Hello";
    const phpClass = `<?php

namespace ${namespace};

class ${className} {
    public static function world() {
        return "Hello from PHP library";
    }
}
`;
    await fs_extra_1.default.writeFile(path_1.default.join(srcPath, `${className}.php`), phpClass);
    const composerJson = {
        name: `vendor/${projectName.toLowerCase()}`,
        description: "A PHP library package",
        type: "library",
        autoload: {
            "psr-4": {
                [`${namespace}\\`]: "src/",
            },
        },
        require: {},
    };
    await fs_extra_1.default.writeFile(path_1.default.join(base, "composer.json"), JSON.stringify(composerJson, null, 2));
    console.log(chalk.green(`✅ PHP library '${projectName}' created with Composer.`));
}
