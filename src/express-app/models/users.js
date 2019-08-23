import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: String,
  age: Number,
  email: {
    type: String,
    validate: {
      validator: function (email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
      },
      message: "Invalid email format"
    }
  }
});

userSchema.pre("save", function () {
  this.lastModifiedDate = new Date();
});

const User = mongoose.model("Users", userSchema);
module.exports = User;
