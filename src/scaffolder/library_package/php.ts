import fs from "fs-extra";
import path from "path";
const chalk = require("chalk");


export async function scaffoldLibPHP({ projectName }: any): Promise<void> {
  const base = path.resolve(process.cwd(), projectName);
  const srcPath = path.join(base, "src");
  await fs.mkdirp(srcPath);

  const cleanName = projectName.replace(/[^a-zA-Z0-9]/g, "");
  const namespace = cleanName.charAt(0).toUpperCase() + cleanName.slice(1);
  const className = "Hello";

  const phpClass = `<?php

namespace ${namespace};

class ${className} {
    public static function world() {
        return "Hello from PHP library";
    }
}
`;

  await fs.writeFile(path.join(srcPath, `${className}.php`), phpClass);

  const composerJson = {
    name: `vendor/${projectName.toLowerCase()}`,
    description: "A PHP library package",
    type: "library",
    autoload: {
      "psr-4": {
        [`${namespace}\\`]: "src/",
      },
    },
    require: {},
  };

  await fs.writeFile(path.join(base, "composer.json"), JSON.stringify(composerJson, null, 2));

  console.log(chalk.green(`✅ PHP library '${projectName}' created with Composer.`));
}
