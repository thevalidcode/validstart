"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scaffoldCliToolProject = scaffoldCliToolProject;
const javascript_1 = require("./javascript");
const typescript_1 = require("./typescript");
const python_1 = require("./python");
const go_1 = require("./go");
const rust_1 = require("./rust");
async function scaffoldCliToolProject(options) {
    switch (options.language.toLowerCase()) {
        case "javascript":
            return (0, javascript_1.scaffoldCLIToolJS)(options);
        case "typescript":
            return (0, typescript_1.scaffoldCLIToolTS)(options);
        case "python":
            return (0, python_1.scaffoldCLIToolPython)(options);
        case "go":
            return (0, go_1.scaffoldCLIToolGo)(options);
        case "rust":
            return (0, rust_1.scaffoldCLIToolRust)(options);
        default:
            console.log(`⚠️ CLI scaffolding for '${options.language}' is not yet supported.`);
    }
}
