"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scaffoldLibraryProject = scaffoldLibraryProject;
const javascript_1 = require("./javascript");
const typescript_1 = require("./typescript");
const python_1 = require("./python");
const rust_1 = require("./rust");
const go_1 = require("./go");
const java_1 = require("./java");
const php_1 = require("./php");
async function scaffoldLibraryProject(options) {
    switch (options.language.toLowerCase()) {
        case "javascript":
            return (0, javascript_1.scaffoldLibJS)(options);
        case "typescript":
            return (0, typescript_1.scaffoldLibTS)(options);
        case "python":
            return (0, python_1.scaffoldLibPython)(options);
        case "rust":
            return (0, rust_1.scaffoldLibRust)(options);
        case "go":
            return (0, go_1.scaffoldLibGo)(options);
        case "java":
            return (0, java_1.scaffoldLibJava)(options);
        case "php":
            return (0, php_1.scaffoldLibPHP)(options);
        default:
            console.log(`⚠️ Library scaffolding for '${options.language}' not supported yet.`);
    }
}
