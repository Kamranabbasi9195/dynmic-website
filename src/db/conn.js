const mongoose = require("mongoose");

// creating database
mongoose.connect("mongodb://127.0.0.1:27017/kamranwebsite", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Database Connection has been successful");
}).catch((error) => {
  console.log(error);
});
