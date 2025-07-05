import { scaffoldFrontendJS } from "./javascript";
import { scaffoldFrontendTS } from "./typescript";
import { scaffoldHTMLCSS } from "./html-css";

interface ScaffoldOptions {
  projectName: string;
  projectType: string;
  language: string;
  framework: string;
  selectedTools: string[];
}

export async function scaffoldFrontendProject(options: ScaffoldOptions): Promise<void> {
  switch (options.language.toLowerCase()) {
    case "javascript":
      return scaffoldFrontendJS(options);
    case "typescript":
      return scaffoldFrontendTS(options);
    case "html/css":
      return scaffoldHTMLCSS(options);
    default:
      console.log(`⚠️ Frontend scaffolding for '${options.language}' is not supported yet.`);
  }
}
