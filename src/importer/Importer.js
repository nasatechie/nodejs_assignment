import { readFile, readFileSync } from "fs";

export class Importer {
  constructor() {}

  import(path) {
    return new Promise((resolve, reject) => {
      readFile(path, "utf-8", (error, data) => {
        if (error) reject(error);
        resolve(data);
      });
    });
  }

  importSync(path) {
    return readFileSync(path, "utf-8");
  }
}
