"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scaffoldBackendGo = scaffoldBackendGo;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const chalk_1 = __importDefault(require("chalk"));
;
const execa_1 = require("execa");
;
async function scaffoldBackendGo(options) {
    const { projectName, framework, selectedTools } = options;
    const projectPath = path_1.default.resolve(process.cwd(), projectName);
    await fs_extra_1.default.mkdirp(projectPath);
    console.log(chalk_1.default.cyan(`\n🐹 Creating Go backend project with ${chalk_1.default.bold(framework)}`));
    await fs_extra_1.default.writeFile(path_1.default.join(projectPath, "main.go"), getGoTemplate(framework));
    await (0, execa_1.execa)("go", ["mod", "init", projectName], { cwd: projectPath });
    const deps = getGoDependencies(framework, selectedTools);
    for (const dep of deps) {
        await (0, execa_1.execa)("go", ["get", dep], { cwd: projectPath });
    }
    console.log(chalk_1.default.gray("🔧 Initializing git..."));
    await (0, execa_1.execa)("git", ["init"], { cwd: projectPath });
    console.log(chalk_1.default.green(`\n✅ Go project '${projectName}' created at ${projectPath}\n`));
}
function getGoTemplate(framework) {
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
function getGoDependencies(framework, tools) {
    const deps = [];
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
        if (supported.includes(tool))
            deps.push(tool);
    }
    return deps;
}
