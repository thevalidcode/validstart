import { scaffoldCLIToolJS } from "./javascript";
import { scaffoldCLIToolTS } from "./typescript";
import { scaffoldCLIToolPython } from "./python";
import { scaffoldCLIToolGo } from "./go";
import { scaffoldCLIToolRust } from "./rust";

interface Options {
  projectName: string;
  projectType: string;
  language: string;
  framework: string;
  selectedTools: string[];
}

export async function scaffoldCliToolProject(options: Options): Promise<void> {
  switch (options.language.toLowerCase()) {
    case "javascript":
      return scaffoldCLIToolJS(options);
    case "typescript":
      return scaffoldCLIToolTS(options);
    case "python":
      return scaffoldCLIToolPython(options);
    case "go":
      return scaffoldCLIToolGo(options);
    case "rust":
      return scaffoldCLIToolRust(options);
    default:
      console.log(`⚠️ CLI scaffolding for '${options.language}' is not yet supported.`);
  }
}
