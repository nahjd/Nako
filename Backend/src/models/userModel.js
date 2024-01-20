const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    id: String,
    name: String,
    about: String,
    image: String,
    price: Number,
  },
  { collection: "mavi", timestamps: true }
);

const User = mongoose.model("mavi", userSchema);

module.exports = User;
