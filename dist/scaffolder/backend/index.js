"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scaffoldBackendProject = scaffoldBackendProject;
const javascript_1 = require("./javascript");
const typescript_1 = require("./typescript");
const python_1 = require("./python");
const go_1 = require("./go");
const rust_1 = require("./rust");
const java_1 = require("./java");
const php_1 = require("./php");
async function scaffoldBackendProject(options) {
    switch (options.language.toLowerCase()) {
        case "javascript":
            return (0, javascript_1.scaffoldBackendJS)(options);
        case "typescript":
            return (0, typescript_1.scaffoldBackendTS)(options);
        case "python":
            return (0, python_1.scaffoldBackendPython)(options);
        case "go":
            return (0, go_1.scaffoldBackendGo)(options);
        case "rust":
            return (0, rust_1.scaffoldBackendRust)(options);
        case "java":
            return (0, java_1.scaffoldBackendJava)(options);
        case "php":
            return (0, php_1.scaffoldBackendPHP)(options);
        default:
            console.log(`⚠️ Backend scaffolding for '${options.language}' not yet supported.`);
    }
}
