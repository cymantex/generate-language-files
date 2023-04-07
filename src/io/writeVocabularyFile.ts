import _ from "lodash";
import fs from "fs";
import {classMultiplierMap} from "../utils/classMultiplierMap";

function toVocabularyFile(vocabularyName: string, path: string, pathClassNames: string[]) {
  return `// Auto-generated file. Do not edit.
import { LanguageSettings } from "@/utils/language/settings";
import { repeat } from "@/utils/utils";

export function ${vocabularyName}({ ${findUsedLanguageSettings(pathClassNames)}, enabledPackages }: LanguageSettings) {
  if (!enabledPackages.has("${path.replaceAll("/", ".")}")) return [];

  return [
${(toRepeatStatements(pathClassNames))}
  ];
}
`;
}

export function writeVocabularyFile(path: string, pathClassNames: string[], paths: string[]) {
  const folderPath = path.replace("java/", "language/java/");
  const packageName = _.last(path.split("/")) || process.exit(1);
  let vocabularyFilePath = hasSubfolder(paths, path)
      ? folderPath + `/${packageName}.ts`
      : folderPath + `.ts`;
  vocabularyFilePath = parseVocabularyFilePath(vocabularyFilePath);
  const vocabularyName = _.last(vocabularyFilePath.split("/"))?.replace(".ts", "") || "";

  console.log(vocabularyFilePath);

  if (hasSubfolder(paths, path)) {
    fs.mkdirSync(folderPath, {recursive: true});
  }

  fs.writeFileSync(vocabularyFilePath, toVocabularyFile(vocabularyName, path, pathClassNames));

  return vocabularyFilePath;
}

function findUsedLanguageSettings(pathClassNames: string[]) {
  return _.uniq(pathClassNames.map(getMultiplier)).join(", ");
}

function parseVocabularyFilePath(vocabularyFilePath: string) {
  let vocabularyFilePathTokens = vocabularyFilePath.split("/");
  const parentFolder = vocabularyFilePathTokens[vocabularyFilePathTokens.length - 2] ?? "";

  return vocabularyFilePath
      .replace("function.ts", "functions.ts")
      .replace("spi.ts", `${parentFolder}Spi.ts`);
}

function hasSubfolder(paths: string[], folderPath: string) {
  return paths.filter(path => path.includes(folderPath)).length > 1;
}

function toRepeatStatements(pathClassNames: string[]) {
  return pathClassNames
      .map((className, i) => i !== (pathClassNames.length - 1)
          ? `    ...repeat("${className}", ${getMultiplier(className)}),\n`
          : `    ...repeat("${className}", ${getMultiplier(className)}),`)
      .reduce((repeats, repeat) => repeats + repeat, "");
}

function getMultiplier(className: string) {
  if (classMultiplierMap.has(className)) {
    return classMultiplierMap.get(className);
  }

  return "veryRareMultiplier";
}
