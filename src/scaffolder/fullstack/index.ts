import { scaffoldFullstackTS } from "./typescript";
import { scaffoldFullstackJS } from "./javascript";
import { scaffoldFullstackPython } from "./python";
import { scaffoldFullstackGo } from "./go";
import { scaffoldFullstackJava } from "./java";
import { scaffoldFullstackPHP } from "./php";
import { scaffoldFullstackRust } from "./rust";

interface Options {
  projectName: string;
  projectType: string;
  language: string;
  framework: string;
  selectedTools: string[];
}

export async function scaffoldFullstackProject(options: Options): Promise<void> {
  switch (options.language.toLowerCase()) {
    case "typescript":
      return scaffoldFullstackTS(options);
    case "javascript":
      return scaffoldFullstackJS(options);
    case "python":
      return scaffoldFullstackPython(options);
    case "go":
      return scaffoldFullstackGo(options);
    case "java":
      return scaffoldFullstackJava(options);
    case "php":
      return scaffoldFullstackPHP(options);
    case "rust":
      return scaffoldFullstackRust(options);
    default:
      console.log(`⚠️ Fullstack scaffolding for '${options.language}' not yet supported.`);
  }
}
