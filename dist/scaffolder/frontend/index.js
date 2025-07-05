"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scaffoldFrontendProject = scaffoldFrontendProject;
const javascript_1 = require("./javascript");
const typescript_1 = require("./typescript");
const html_css_1 = require("./html-css");
async function scaffoldFrontendProject(options) {
    switch (options.language.toLowerCase()) {
        case "javascript":
            return (0, javascript_1.scaffoldFrontendJS)(options);
        case "typescript":
            return (0, typescript_1.scaffoldFrontendTS)(options);
        case "html/css":
            return (0, html_css_1.scaffoldHTMLCSS)(options);
        default:
            console.log(`⚠️ Frontend scaffolding for '${options.language}' is not supported yet.`);
    }
}
