import { scaffoldFrontendProject } from "./frontend";
import { scaffoldBackendProject } from "./backend";
import { scaffoldFullstackProject } from "./fullstack";
import { scaffoldCliToolProject } from ".//clitool";
import { scaffoldLibraryProject } from ".//library_package";

interface ScaffoldOptions {
  projectName: string;
  projectType: string;
  language: string;
  framework: string;
  selectedTools: string[];
}

export async function scaffoldProject(options: ScaffoldOptions): Promise<void> {
  const type = options.projectType.toLowerCase();

  switch (type) {
    case "frontend":
      return scaffoldFrontendProject(options);
    case "backend":
      return scaffoldBackendProject(options);
    case "fullstack":
      return scaffoldFullstackProject(options);
    case "cli tool":
      return scaffoldCliToolProject(options);
    case "library/package":
      return scaffoldLibraryProject(options);
    default:
      console.log(`⚠️ Scaffolding for project type '${options.projectType}' is not yet supported.`);
  }
}
