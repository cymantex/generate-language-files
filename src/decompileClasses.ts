import {exec} from "child_process";
import fs from "fs";

async function main() {
  return decompileClasses("java");
}

function javaFileExists(path: string, file: string) {
  return fs.existsSync(`${path}/${file.replace(".class", ".java")}`);
}

async function decompileClasses(path: string): Promise<void> {
  let fileNames = fs.readdirSync(path);

  if (!fileNames) return Promise.resolve();

  const promises: Promise<void>[] = fileNames
      .map(async file => {
        if (file.endsWith(".class") && !javaFileExists(path, file)) {
          return decompileClass(`${path}/${file}`);
        } else if (!file.includes(".") && !file.endsWith(".java")) {
          return decompileClasses(`${path}/${file}`);
        }

        return Promise.resolve();
      });

  return Promise.all(promises).then(() => Promise.resolve());
}

async function decompileClass(classPath: string) {
  return new Promise<void>((resolve, reject) => {
    const className = classPath.replace(".class", "");

    console.log(className);

    exec(`javap ${classPath} > ${className}.java`, (error) => {
      if (error) {
        reject(error);
      }

      resolve();
    });
  });
}

main();
