import http from "http";

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

const requestHandler = (request, response) => {
  response.writeHead(200, { "Content-Type": "application/json" });
  response.end("Json Server\n" + JSON.stringify(product, null, 4));
};

const server = http.createServer(requestHandler);
server.listen(PORT_NUMBER, err => {
  if (err) {
    console.error(`An error occurred ${err}`);
  }
  console.log(`Server is listening on port number ${PORT_NUMBER}`);
});
