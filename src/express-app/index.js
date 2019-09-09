import app from "./app";
import mongoose from "mongoose";
import { mongoURL } from "./config";

const PORT_NUMBER = process.env.PORT || 8000;
app.listen(PORT_NUMBER, () =>
  console.log(`Express App listening on port number ${PORT_NUMBER}`)
);

mongoose.connect(mongoURL, function(err) {
  if (err) {
    throw err;
  }
  console.log("Successfully connected");
});
