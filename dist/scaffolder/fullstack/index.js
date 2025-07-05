"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scaffoldFullstackProject = scaffoldFullstackProject;
const typescript_1 = require("./typescript");
const javascript_1 = require("./javascript");
const python_1 = require("./python");
const go_1 = require("./go");
const java_1 = require("./java");
const php_1 = require("./php");
const rust_1 = require("./rust");
async function scaffoldFullstackProject(options) {
    switch (options.language.toLowerCase()) {
        case "typescript":
            return (0, typescript_1.scaffoldFullstackTS)(options);
        case "javascript":
            return (0, javascript_1.scaffoldFullstackJS)(options);
        case "python":
            return (0, python_1.scaffoldFullstackPython)(options);
        case "go":
            return (0, go_1.scaffoldFullstackGo)(options);
        case "java":
            return (0, java_1.scaffoldFullstackJava)(options);
        case "php":
            return (0, php_1.scaffoldFullstackPHP)(options);
        case "rust":
            return (0, rust_1.scaffoldFullstackRust)(options);
        default:
            console.log(`⚠️ Fullstack scaffolding for '${options.language}' not yet supported.`);
    }
}
