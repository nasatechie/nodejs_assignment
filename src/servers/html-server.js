import http from "http";
import through2 from "through2";
import path from "path";
import { readFileSync, createReadStream } from "fs";
import config from "./html-server-meta-config";

const INDEX_FILE_PATH = path.join(__dirname, "index.html");
const PORT_NUMBER = 3000;
const { htmlServerMeta, htmlStreamServerMeta } = config;

const requestHandler = (request, response) => {
  response.writeHead(200, { "Content-Type": "text/html" });
  if (process.argv[2] === "--stream") {
    const transformer = through2(function(chunk, _, callback) {
      this.push(interpolateHTML(chunk.toString(), htmlStreamServerMeta));
      callback();
    });
    createReadStream(INDEX_FILE_PATH)
      .pipe(transformer)
      .pipe(response);
  } else {
    const content = readFileSync(INDEX_FILE_PATH, "utf8");
    const responseBody = interpolateHTML(content, htmlServerMeta);
    response.end(responseBody);
  }
};

const interpolateHTML = (content, config) => {
  return content
    .replace("{title}", config.title)
    .replace("{head}", config.head)
    .replace("{message}", config.message);
};

const server = http.createServer(PORT_NUMBER, requestHandler);
server.listen(PORT_NUMBER, err => {
  if (err) {
    console.error(`An error occurred ${err}`);
  }
  console.log(`Server is listening on port number ${PORT_NUMBER}`);
});
