import { scaffoldLibJS } from "./javascript";
import { scaffoldLibTS } from "./typescript";
import { scaffoldLibPython } from "./python";
import { scaffoldLibRust } from "./rust";
import { scaffoldLibGo } from "./go";
import { scaffoldLibJava } from "./java";
import { scaffoldLibPHP } from "./php";

interface Options {
  projectName: string;
  projectType: string;
  language: string;
  framework: string;
  selectedTools: string[];
}

export async function scaffoldLibraryProject(options: Options): Promise<void> {
  switch (options.language.toLowerCase()) {
    case "javascript":
      return scaffoldLibJS(options);
    case "typescript":
      return scaffoldLibTS(options);
    case "python":
      return scaffoldLibPython(options);
    case "rust":
      return scaffoldLibRust(options);
    case "go":
      return scaffoldLibGo(options);
    case "java":
      return scaffoldLibJava(options);
    case "php":
      return scaffoldLibPHP(options);
    default:
      console.log(`⚠️ Library scaffolding for '${options.language}' not supported yet.`);
  }
}
