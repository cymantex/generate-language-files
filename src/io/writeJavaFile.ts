import fs from "fs";
import _ from "lodash";

export function writeJavaFile(vocabularyFileImportPaths: string[]) {
  fs.writeFileSync("language/java/java.ts",
      `// Auto-generated file. Do not edit.
import { repeatArray } from "../../utils";
import { Settings } from "@/types";
import { keywords } from "./keywords";
${vocabularyFileImportPaths
          .map(importPath =>
              `import { ${(toPackageName(importPath))} } from "${importPath}";`)
          .join("\n")}

export const java = (settings: Settings) =>
  repeatArray(
    [
      ...keywords(settings),
${vocabularyFileImportPaths
          .map(importPath => (
              `      ...${toPackageName(importPath)}(settings),`))
          .join("\n")}
    ],
    settings.vocabularyMultiplier
  );
`);
}

function toPackageName(vocabularyFileImportPath: string) {
  return _.last(vocabularyFileImportPath.split("/"));
}

