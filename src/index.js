import * as config from "./config/config";
import { User, Product } from "./models";
import { Dirwatcher } from "./dirwatcher";
import { Importer } from "./importer";
import * as csvtojson from "csvtojson";

console.log(config.name);
new User();
new Product();

const dirwatcher = new Dirwatcher();
const importer = new Importer();

const path = "src/data";
dirwatcher.watch(path, 1000);
dirwatcher.on("changed", (type, filename) => {
  if (type === "new") {
    console.log("New File added and details are\n");
  } else {
    console.log(`${filename} got updated and here are the details\n`);
  }
  const filePath = `${path}/${filename}`;
  importer.import(filePath).then(data => convertCSVToJSON(data));
  convertCSVToJSON(importer.importSync(filePath));
});

function convertCSVToJSON(csvData) {
  csvtojson
    .csv()
    .fromString(csvData)
    .then(data => console.log(data));
}
