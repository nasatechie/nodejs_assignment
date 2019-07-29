import http, { IncomingMessage, ServerResponse } from "http";

const PORT_NUMBER = 3000;

const product = {
  id: 1,
  name: "Supreme T-Shirt",
  brand: "Supreme",
  price: 99.99,
  options: [
    {
      color: "blue"
    },
    {
      size: "XL"
    }
  ]
};

/**
 * Function that is called each time the server gets a request
 * @param {IncomingMessage} request
 * @param {ServerResponse} response
 */

const requestHandler = (request, response) => {
  response.writeHead(200, { "Content-Type": "application/json" });
  response.end(JSON.stringify(product, null, 4));
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
