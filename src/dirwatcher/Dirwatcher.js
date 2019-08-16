import { exec } from "child_process";
import { EventEmitter } from "events";

export class Dirwatcher extends EventEmitter {
  constructor() {
    super();
    this.filesData = [];
  }
  watch(path, delay) {
    setInterval(() => {
      exec(
        `cd ${path} & ls --full-time -Gg| awk '{print $4, $5, $6, $7}'`,
        (error, stdout) => {
          this.processFilesData(stdout.trim().split("\n"));
          if (error !== null) {
            console.log("exec error: " + error);
          }
        }
      );
    }, delay);
  }

  processFilesData(files) {
    if (this.filesData.length !== 0) {
      files.forEach(file => {
        const fileDetails = this.getFileNameAndTime(file);
        const existingFile = this.filesData.find(
          fileInfo => fileInfo.name === fileDetails.name
        );
        if (existingFile) {
          if (fileDetails.time > existingFile.time) {
            this.filesData.forEach(file => {
              if (file.name === fileDetails.name) {
                file.time = fileDetails.time;
              }
            });
            this.emit("changed", "existing", fileDetails.name);
          }
        } else {
          this.filesData.push(fileDetails);
          this.emit("changed", "new", fileDetails.name);
        }
      });
    } else {
      this.filesData = files.map(file => this.getFileNameAndTime(file));
    }
  }

  getFileNameAndTime(file) {
    const fileDetails = file.split(" ");
    const name = fileDetails[fileDetails.length - 1];
    const time = new Date(fileDetails.slice(0, 3).join(" "));
    return { name, time };
  }
}
