import http, { IncomingMessage, ServerResponse } from "http";

const PORT_NUMBER = 3000;

/**
 * Function that is called each time the server gets a request
 * @param {IncomingMessage} request
 * @param {ServerResponse} response
 */

const requestHandler = (request, response) => {
  response.writeHead(200, { "Content-Type": "text/html" });
  request.pipe(response);
};

/**
 * A http server listening for requests on a specified port number
 */

const server = http.createServer(requestHandler);
server.listen(PORT_NUMBER, err => {
  if (err) {
    console.error(`An error occurred ${err}`);
  }
  console.log(`Server is listening on port number ${PORT_NUMBER}`);
});
