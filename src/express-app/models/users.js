import mongoose from "mongoose";
import { emailValidator } from "../validators/email-validator";

const userSchema = mongoose.Schema({
  name: String,
  age: Number,
  email: {
    type: String,
    validate: {
      validator: emailValidator,
      message: "Invalid email format"
    }
  }
});

const User = mongoose.model("Users", userSchema);
module.exports = User;
