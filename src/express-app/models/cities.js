import mongoose from "mongoose";

const citySchema = mongoose.Schema({
  name: String,
  country: String,
  capital: {
    type: Boolean,
    required: true
  },
  location: {
    lat: Number,
    long: Number
  },
  lastModifiedDate: Date
});

citySchema.pre(["save", "findOneAndUpdate"], function() {
  this.lastModifiedDate = new Date();
});

const City = mongoose.model("Cities", citySchema);
module.exports = City;
