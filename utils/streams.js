#!/usr/bin/env node

import program from "commander";
import path from "path";
import fs from "fs";
import through2 from "through2";
import { CsvToJson } from "./csvtojson";
import https from "https";

const externalCSSLink =
  "https://cdnjs.cloudflare.com/ajax/libs/16pixels/0.1.9/16pixels.css";
const isFileCSV = fileName => /\.csv$/.test(fileName);

/**
 * Function which reverses the given user input
 */

function reverse() {
  const transformer = through2(function(data, encode, callbackFn) {
    this.push(
      data
        .toString()
        .split("")
        .reverse()
        .join("") + "\n\n"
    );
    callbackFn();
  });
  console.log(
    "\nInput the strings to be reversed and press ENTER.\n\nTo exit press CTRL+C"
  );
  process.stdin.pipe(transformer).pipe(process.stdout);
}

/**
 * Function which transforms the user input to Uppercase
 */

function transform() {
  const transformer = through2(function(data, encode, callbackFn) {
    this.push(data.toString().toUpperCase());
    callbackFn();
  });
  console.log(
    "\nInput the strings to be transformed to uppercase and press ENTER.\n\nTo exit press CTRL+C"
  );
  process.stdin.pipe(transformer).pipe(process.stdout);
}

/**
 * Function which reads the file content from the given file path and outputs the content on to the console
 * @param {string} filePath
 */

function outputFile(filePath) {
  fs.createReadStream(filePath)
    .on("error", error =>
      console.log(`An error occured while reading the file: ${error}`)
    )
    .pipe(process.stdout);
}

/**
 * Function to convert file provided by ​**file**​​ option from ​**csv**​​ to **json**​​ and output data to ​**process.stdout**
 * @param {string} filePath
 */

function convertFromFile(filePath) {
  let stream = through2.obj({ objectMode: true }, function(
    chunk,
    enc,
    callback
  ) {
    this.push(JSON.stringify(CsvToJson(chunk.toString())));
    callback();
  });

  fs.createReadStream(path.join(filePath))
    .pipe(stream)
    .pipe(process.stdout)
    .on("done", () => {
      console.log("convertFromFile is done");
    });
}

/**
 * Function to convert file provided by ​**file**​​ option from **​csv​​** to **json​**​ and output data to a result file with the same name but​​​ json​​​​ extension
 * @param {string} filePath
 */

function convertToFile(filePath) {
  if (!isFileCSV(filePath)) {
    throw new Error("File provided should be a csv file");
  }
  let readStream = fs.createReadStream(path.join(filePath));
  let writeStream = fs.createWriteStream(
    path.join(filePath.replace(".csv", ".json"))
  );

  readStream
    .on("data", data => {
      writeStream.write(JSON.stringify(CsvToJson(data.toString())));
    })
    .on("end", () => {
      console.log("convertToFile is done");
    });
}

/**
 * Function which takes the directory path as an input and concats all the css file contents within the directory into one single css file.
 *
 * @param {string} dirPath The directory from which the css files will be bundled
 *
 * @output A single css file **bundle.css** created within the same **dirPath** directory
 */

function bundleCSS(dirPath) {
  const fileNames = fs.readdirSync(dirPath);
  const cssFileNames = fileNames.filter(file => {
    const regEx = /\.css/;
    return regEx.test(file);
  });
  let writeStream = fs.createWriteStream(path.join(dirPath, "bundle.css"));
  cssFileNames.forEach(file => {
    fs.createReadStream(path.join(dirPath, file)).pipe(writeStream);
  });

  let httpsStream = fs.createWriteStream(path.join(dirPath, "bundle.css"), {
    flags: "a"
  });
  https.get(externalCSSLink, data => {
    data.pipe(httpsStream);
    console.log("css bundler has been generated");
  });
}

program
  .version("1.0.0")
  .option("-a, --action <action>", "Action to be executed")
  .option("-f, --file [file]", "File to be processed")
  .option("-p, --path [path]", "Folder path with css files")
  .parse(process.argv);

const isArgumentValid = (arg, value) => {
  if (typeof arg !== "string") {
    console.log(
      `Provide a valid value for ${value} with --${value} option (or) -${value.charAt(
        0
      )} option`
    );
    return false;
  }
  return true;
};

switch (program.action) {
  case "reverse":
    reverse();
    break;
  case "transform":
    transform();
    break;
  case "outputFile":
    if (!isArgumentValid(program.file, "file")) break;
    outputFile(program.file);
    break;
  case "convertFromFile":
    if (!isArgumentValid(program.file, "file")) break;
    convertFromFile(program.file);
    break;
  case "convertToFile":
    if (!isArgumentValid(program.file, "file")) break;
    convertToFile(program.file);
    break;
  case "cssBundler":
    if (!isArgumentValid(program.path, "path")) break;
    bundleCSS(program.path);
    break;
  default:
    console.warn(
      "\nYou have passed an invalid action. Please pass one of the actions listed below "
    );
    program.outputHelp();
}
