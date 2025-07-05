"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scaffoldBackendTS = scaffoldBackendTS;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const chalk_1 = __importDefault(require("chalk"));
const execa_1 = require("execa");
async function scaffoldBackendTS(options) {
    const { projectName, framework, selectedTools } = options;
    const projectPath = path_1.default.resolve(process.cwd(), projectName);
    console.log(chalk_1.default.cyan(`\n🚀 Creating backend project with ${chalk_1.default.bold(framework)} in TypeScript`));
    await fs_extra_1.default.mkdirp(projectPath);
    await (0, execa_1.execa)("npm", ["init", "-y"], { cwd: projectPath });
    await (0, execa_1.execa)("npm", ["install", "--save-dev", "typescript", "ts-node", "@types/node"], {
        cwd: projectPath,
        stdio: "inherit",
    });
    await (0, execa_1.execa)("npx", ["tsc", "--init"], { cwd: projectPath });
    await fs_extra_1.default.writeFile(path_1.default.join(projectPath, "src", "index.ts"), getBaseTemplate(framework));
    await fs_extra_1.default.writeJson(path_1.default.join(projectPath, "package.json"), {
        name: projectName,
        version: "1.0.0",
        type: "module",
        main: "src/index.ts",
        scripts: {
            start: "ts-node src/index.ts",
            build: "tsc",
        },
    }, { spaces: 2 });
    const dependencies = getDependencies(framework, selectedTools);
    if (dependencies.length) {
        console.log(chalk_1.default.blue(`📦 Installing dependencies: ${dependencies.join(", ")}`));
        await (0, execa_1.execa)("npm", ["install", ...dependencies], { cwd: projectPath, stdio: "inherit" });
    }
    console.log(chalk_1.default.gray("🔧 Initializing git..."));
    await (0, execa_1.execa)("git", ["init"], { cwd: projectPath });
    console.log(chalk_1.default.green(`\n✅ TypeScript backend project '${projectName}' created with ${framework} at ${projectPath}\n`));
}
function getBaseTemplate(framework) {
    switch (framework.toLowerCase()) {
        case "express":
            return `import express from "express";

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (_req, res) => {
  res.send("Hello from Express (TS)!");
});

app.listen(port, () => {
  console.log(\`🚀 Server running at http://localhost:\${port}\`);
});
`;
        case "fastify":
            return `import Fastify from "fastify";

const fastify = Fastify();

fastify.get("/", async () => {
  return { message: "Hello from Fastify (TS)!" };
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
  ctx.body = "Hello from Koa (TS)!";
});

app.listen(3000, () => {
  console.log("🚀 Server running at http://localhost:3000");
});
`;
        default:
            return `console.log("No supported framework selected.");`;
    }
}
function getDependencies(framework, tools) {
    const deps = [];
    const devDeps = [];
    switch (framework.toLowerCase()) {
        case "express":
            deps.push("express");
            devDeps.push("@types/express");
            break;
        case "fastify":
            deps.push("fastify");
            break;
        case "koa":
            deps.push("koa");
            devDeps.push("@types/koa");
            break;
    }
    const supported = ["dotenv", "zod", "chalk", "cors", "helmet", "morgan"];
    for (const tool of tools) {
        if (supported.includes(tool))
            deps.push(tool);
    }
    return [...deps, ...devDeps];
}
