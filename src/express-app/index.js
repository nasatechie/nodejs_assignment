import app from "./app";

const PORT_NUMBER = process.env.PORT || 8000;
app.listen(PORT_NUMBER, () =>
  console.log(`Express App listening on port number ${PORT_NUMBER}`)
);
