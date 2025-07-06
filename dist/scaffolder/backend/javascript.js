"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scaffoldBackendJS = scaffoldBackendJS;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const chalk = require("chalk");
const execa_1 = require("execa");
async function scaffoldBackendJS(options) {
    const { projectName, framework, selectedTools } = options;
    const projectPath = path_1.default.resolve(process.cwd(), projectName);
    await fs_extra_1.default.mkdirp(projectPath);
    console.log(chalk.cyan(`\n🚀 Creating backend project with ${chalk.bold(framework)} in ${projectName}`));
    await fs_extra_1.default.writeFile(path_1.default.join(projectPath, "index.js"), getBaseTemplate(framework));
    await fs_extra_1.default.writeJson(path_1.default.join(projectPath, "package.json"), {
        name: projectName,
        version: "1.0.0",
        type: "module",
        main: "index.js",
        scripts: {
            start: "node index.js",
        },
    }, { spaces: 2 });
    const dependencies = getDependencies(framework, selectedTools);
    if (dependencies.length > 0) {
        console.log(chalk.blue(`📦 Installing dependencies: ${dependencies.join(", ")}`));
        await (0, execa_1.execa)("npm", ["install", ...dependencies], { cwd: projectPath, stdio: "inherit" });
    }
    console.log(chalk.gray("🔧 Initializing git..."));
    await (0, execa_1.execa)("git", ["init"], { cwd: projectPath });
    console.log(chalk.green(`\n✅ Backend project '${projectName}' created with ${framework} at ${projectPath}\n`));
}
function getBaseTemplate(framework) {
    switch (framework.toLowerCase()) {
        case "express":
            return `import express from "express";

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello from Express!");
});

app.listen(port, () => {
  console.log(\`🚀 Server running at http://localhost:\${port}\`);
});
`;
        case "fastify":
            return `import Fastify from "fastify";

const fastify = Fastify();

fastify.get("/", async (request, reply) => {
  return { message: "Hello from Fastify!" };
});

fastify.listen({ port: 3000 }, (err) => {
  if (err) throw err;
  console.log("🚀 Server running at http://localhost:3000");
});
`;
        case "koa":
            return `import Koa from "koa";

const app = new Koa();

app.use(async (ctx) => {
  ctx.body = "Hello from Koa!";
});

app.listen(3000, () => {
  console.log("🚀 Server running at http://localhost:3000");
});
`;
        default:
            return `console.log("No framework selected.");`;
    }
}
function getDependencies(framework, tools) {
    const deps = [];
    switch (framework.toLowerCase()) {
        case "express":
            deps.push("express");
            break;
        case "fastify":
            deps.push("fastify");
            break;
        case "koa":
            deps.push("koa");
            break;
    }
    // Add some commonly selected backend JS tools
    const supported = ["dotenv", "chalk", "cors", "helmet", "morgan"];
    for (const tool of tools) {
        if (supported.includes(tool))
            deps.push(tool);
    }
    return deps;
}
