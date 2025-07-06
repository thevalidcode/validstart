import fs from "fs-extra";
import path from "path";
const chalk = require("chalk");


interface Options {
  projectName: string;
  projectType: string;
  language: string;
  framework: string;
  selectedTools: string[];
}

export async function scaffoldBackendJava(options: Options): Promise<void> {
  const { projectName } = options;
  const projectPath = path.resolve(process.cwd(), projectName);

  console.log(chalk.cyan(`\n☕ Creating Spring Boot project scaffold for '${projectName}'`));

  await fs.mkdirp(path.join(projectPath, "src", "main", "java", "com", "example", "demo"));
  await fs.mkdirp(path.join(projectPath, "src", "main", "resources"));

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

  await fs.writeFile(
    path.join(projectPath, "src", "main", "java", "com", "example", "demo", "DemoApplication.java"),
    mainJava,
  );
  await fs.writeFile(path.join(projectPath, "pom.xml"), pomXml);

  console.log(chalk.green(`\n✅ Java Spring Boot scaffold created at ${projectPath}\n`));
}
