import { scaffoldBackendJS } from "./javascript";
import { scaffoldBackendTS } from "./typescript";
import { scaffoldBackendPython } from "./python";
import { scaffoldBackendGo } from "./go";
import { scaffoldBackendRust } from "./rust";
import { scaffoldBackendJava } from "./java";
import { scaffoldBackendPHP } from "./php";

interface Options {
  projectName: string;
  projectType: string;
  language: string;
  framework: string;
  selectedTools: string[];
}

export async function scaffoldBackendProject(options: Options): Promise<void> {
  switch (options.language.toLowerCase()) {
    case "javascript":
      return scaffoldBackendJS(options);
    case "typescript":
      return scaffoldBackendTS(options);
    case "python":
      return scaffoldBackendPython(options);
    case "go":
      return scaffoldBackendGo(options);
    case "rust":
      return scaffoldBackendRust(options);
    case "java":
      return scaffoldBackendJava(options);
    case "php":
      return scaffoldBackendPHP(options);
    default:
      console.log(`⚠️ Backend scaffolding for '${options.language}' not yet supported.`);
  }
}
