"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scaffoldBackendJava = scaffoldBackendJava;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const chalk_1 = __importDefault(require("chalk"));
async function scaffoldBackendJava(options) {
    const { projectName } = options;
    const projectPath = path_1.default.resolve(process.cwd(), projectName);
    console.log(chalk_1.default.cyan(`\n☕ Creating Spring Boot project scaffold for '${projectName}'`));
    await fs_extra_1.default.mkdirp(path_1.default.join(projectPath, "src", "main", "java", "com", "example", "demo"));
    await fs_extra_1.default.mkdirp(path_1.default.join(projectPath, "src", "main", "resources"));
    const mainJava = `package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;

@SpringBootApplication
@RestController
public class DemoApplication {

  public static void main(String[] args) {
    SpringApplication.run(DemoApplication.class, args);
  }

  @GetMapping("/")
  public String hello() {
    return "Hello from Spring Boot!";
  }
}
`;
    const pomXml = `<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" 
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 
         http://maven.apache.org/xsd/maven-4.0.0.xsd">

  <modelVersion>4.0.0</modelVersion>
  <groupId>com.example</groupId>
  <artifactId>${projectName}</artifactId>
  <version>1.0.0</version>
  <packaging>jar</packaging>

  <properties>
    <java.version>17</java.version>
  </properties>

  <dependencies>
    <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
  </dependencies>

  <build>
    <plugins>
      <plugin>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-maven-plugin</artifactId>
      </plugin>
    </plugins>
  </build>
</project>
`;
    await fs_extra_1.default.writeFile(path_1.default.join(projectPath, "src", "main", "java", "com", "example", "demo", "DemoApplication.java"), mainJava);
    await fs_extra_1.default.writeFile(path_1.default.join(projectPath, "pom.xml"), pomXml);
    console.log(chalk_1.default.green(`\n✅ Java Spring Boot scaffold created at ${projectPath}\n`));
}
