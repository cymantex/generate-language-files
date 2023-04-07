import fs from "fs";
import {Class} from "../utils/types";

export async function readClassFiles(path: string): Promise<Class[]> {
  const fileNames = fs.readdirSync(path);

  if (!fileNames) return Promise.resolve([]);

  const classInCurrentFolderPromises: Promise<Class>[] = fileNames
      .filter(fileName => fileName.endsWith(".class"))
      .map(className => isPublic(`${path}/${className}`, className.replace(".class", ""))
          .then(publicClass => ({
            name: className.replace(".class", ""),
            path,
            public: publicClass
          })));

  const classesInSubFoldersPromises: Promise<Class[]>[] = fileNames
      .filter(fileName => !fileName.includes("."))
      .flatMap(folderName => readClassFiles(`${path}/${folderName}`));

  const classesInCurrentFolder: Class[] = await Promise.all(classInCurrentFolderPromises);
  const classesInSubFolders: Class[] = await Promise.all(classesInSubFoldersPromises)
      .then(classes => classes.flat());

  return [...classesInCurrentFolder, ...classesInSubFolders];
}

function isPublic(classPath: string, className: string): Promise<boolean> {
  let javaClassPath = classPath.replace(".class", ".java");

  return new Promise((resolve, reject) => {
    if (!fs.existsSync(javaClassPath)) return resolve(false);

    fs.readFile(javaClassPath, "utf8", (err, buffer) => {
      if (err) {
        reject(err);
      }

      resolve(new RegExp(`public.*${className}`).test(buffer.toString()));
    });
  });
}
