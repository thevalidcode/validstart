"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scaffoldProject = scaffoldProject;
const frontend_1 = require("./frontend");
const backend_1 = require("./backend");
const fullstack_1 = require("./fullstack");
const clitool_1 = require(".//clitool");
const library_package_1 = require(".//library_package");
async function scaffoldProject(options) {
    const type = options.projectType.toLowerCase();
    switch (type) {
        case "frontend":
            return (0, frontend_1.scaffoldFrontendProject)(options);
        case "backend":
            return (0, backend_1.scaffoldBackendProject)(options);
        case "fullstack":
            return (0, fullstack_1.scaffoldFullstackProject)(options);
        case "cli tool":
            return (0, clitool_1.scaffoldCliToolProject)(options);
        case "library/package":
            return (0, library_package_1.scaffoldLibraryProject)(options);
        default:
            console.log(`⚠️ Scaffolding for project type '${options.projectType}' is not yet supported.`);
    }
}
