import fs from "fs-extra";
import path from "path";

export async function generateLicense(projectPath: string, author = "Anonymous") {
  const year = new Date().getFullYear();
  const content = `MIT License

Copyright (c) ${year} ${author}

Permission is hereby granted, free of charge, to any person obtaining a copy
...`;

  await fs.writeFile(path.join(projectPath, "LICENSE"), content);
}
