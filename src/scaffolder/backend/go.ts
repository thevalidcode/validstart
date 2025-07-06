import fs from "fs-extra";
import path from "path";
const chalk = require("chalk");

import { execa } from "execa";

interface Options {
  projectName: string;
  projectType: string;
  language: string;
  framework: string;
  selectedTools: string[];
}

export async function scaffoldBackendGo(options: Options): Promise<void> {
  const { projectName, framework, selectedTools } = options;
  const projectPath = path.resolve(process.cwd(), projectName);

  await fs.mkdirp(projectPath);
  console.log(chalk.cyan(`\n🐹 Creating Go backend project with ${chalk.bold(framework)}`));

  await fs.writeFile(path.join(projectPath, "main.go"), getGoTemplate(framework));

  await execa("go", ["mod", "init", projectName], { cwd: projectPath });

  const deps = getGoDependencies(framework, selectedTools);
  for (const dep of deps) {
    await execa("go", ["get", dep], { cwd: projectPath });
  }

  console.log(chalk.gray("🔧 Initializing git..."));
  await execa("git", ["init"], { cwd: projectPath });

  console.log(chalk.green(`\n✅ Go project '${projectName}' created at ${projectPath}\n`));
}

function getGoTemplate(framework: string): string {
  switch (framework.toLowerCase()) {
    case "gin":
      return `package main

import "github.com/gin-gonic/gin"

func main() {
  r := gin.Default()
  r.GET("/", func(c *gin.Context) {
    c.JSON(200, gin.H{"message": "Hello from Gin!"})
  })
  r.Run(":3000")
}
`;
    case "fiber":
      return `package main

import "github.com/gofiber/fiber/v2"

func main() {
  app := fiber.New()
  app.Get("/", func(c *fiber.Ctx) error {
    return c.SendString("Hello from Fiber!")
  })
  app.Listen(":3000")
}
`;
    case "echo":
      return `package main

import (
  "net/http"
  "github.com/labstack/echo/v4"
)

func main() {
  e := echo.New()
  e.GET("/", func(c echo.Context) error {
    return c.String(http.StatusOK, "Hello from Echo!")
  })
  e.Start(":3000")
}
`;
    default:
      return `package main

import "fmt"

func main() {
  fmt.Println("No supported framework selected.")
}
`;
  }
}

function getGoDependencies(framework: string, tools: string[]): string[] {
  const deps: string[] = [];

  switch (framework.toLowerCase()) {
    case "gin":
      deps.push("github.com/gin-gonic/gin");
      break;
    case "fiber":
      deps.push("github.com/gofiber/fiber/v2");
      break;
    case "echo":
      deps.push("github.com/labstack/echo/v4");
      break;
  }

  const supported = ["github.com/spf13/viper", "gorm.io/gorm", "github.com/joho/godotenv"];
  for (const tool of tools) {
    if (supported.includes(tool)) deps.push(tool);
  }

  return deps;
}
