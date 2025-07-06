import fs from "fs-extra";
import path from "path";
import chalk from "chalk";;

import { execa } from "execa";;

interface Options {
  projectName: string;
  projectType: string;
  language: string;
  framework: string;
  selectedTools: string[];
}

export async function scaffoldBackendTS(options: Options): Promise<void> {
  const { projectName, framework, selectedTools } = options;
  const projectPath = path.resolve(process.cwd(), projectName);

  console.log(
    chalk.cyan(`\n🚀 Creating backend project with ${chalk.bold(framework)} in TypeScript`),
  );
  await fs.mkdirp(projectPath);

  await execa("npm", ["init", "-y"], { cwd: projectPath });
  await execa("npm", ["install", "--save-dev", "typescript", "ts-node", "@types/node"], {
    cwd: projectPath,
    stdio: "inherit",
  });

  await execa("npx", ["tsc", "--init"], { cwd: projectPath });

  await fs.writeFile(path.join(projectPath, "src", "index.ts"), getBaseTemplate(framework));

  await fs.writeJson(
    path.join(projectPath, "package.json"),
    {
      name: projectName,
      version: "1.0.0",
      type: "module",
      main: "src/index.ts",
      scripts: {
        start: "ts-node src/index.ts",
        build: "tsc",
      },
    },
    { spaces: 2 },
  );

  const dependencies = getDependencies(framework, selectedTools);
  if (dependencies.length) {
    console.log(chalk.blue(`📦 Installing dependencies: ${dependencies.join(", ")}`));
    await execa("npm", ["install", ...dependencies], { cwd: projectPath, stdio: "inherit" });
  }

  console.log(chalk.gray("🔧 Initializing git..."));
  await execa("git", ["init"], { cwd: projectPath });

  console.log(
    chalk.green(
      `\n✅ TypeScript backend project '${projectName}' created with ${framework} at ${projectPath}\n`,
    ),
  );
}

function getBaseTemplate(framework: string): string {
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

function getDependencies(framework: string, tools: string[]): string[] {
  const deps: string[] = [];
  const devDeps: string[] = [];

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
    if (supported.includes(tool)) deps.push(tool);
  }

  return [...deps, ...devDeps];
}
