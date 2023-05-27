const mongoose = require("mongoose");
const validator = require("validator");

// Now we create the schema

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
  },
  email: {
    type: String,
    required: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid email id");
      }
    },
  },
  phone: {
    type: Number,
    required: true,
    min: 10,
  },
  message: {
    type: String,
    required: true,
    minlength: 3,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// Now we need to create the collection/model
const User = mongoose.model("User", userSchema);

module.exports = User;
