import fs from "fs";
import _ from "lodash";
import {readClassFiles} from "./io/readClassFiles";
import {Class, PathToClassNames} from "./utils/types";
import {writeJavaFile} from "./io/writeJavaFile";
import {writeVocabularyFile} from "./io/writeVocabularyFile";

async function main() {
  const classes = await readClassFiles("java");

  const publicClassNames = classes.filter(clazz => clazz.public);
  const pathToClassNames = mapPathToClassNames(publicClassNames);
  const allClassPaths = _.uniq(classes.map(clazz => clazz.path));

  if (fs.existsSync("language/java")) {
    fs.rmSync("language/java", {recursive: true, force: true});
  }

  fs.mkdirSync("language/java", {recursive: true});

  const vocabularyFileImportPaths = Object.entries(pathToClassNames)
      .map(([path, classNames]) => writeVocabularyFile(path, classNames, allClassPaths))
      .map(vocabularyFilePath => vocabularyFilePath
          .replace("language/java/", "./")
          .replace(".ts", ""));

  writeJavaFile(vocabularyFileImportPaths);
}

function mapPathToClassNames(classes: Class[]): PathToClassNames {
  return classes.reduce((pathToClass, clazz) => {
    if (pathToClass[clazz.path]) {
      return { ...pathToClass, [clazz.path]: [...pathToClass[clazz.path], clazz.name] };
    }

    return { ...pathToClass, [clazz.path]: [clazz.name] };
  }, {} as PathToClassNames);
}

main();
