const mongoose = require("mongoose");
require("dotenv").config();
const DATABASE_URL = process.env.DATABASE_URL;

const CONFIG = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(DATABASE_URL, CONFIG);
mongoose.connection.on("connected", () =>
  console.log("Mongoose connected, sir")
);
mongoose.connection.on("error", () =>
  console.log("Mongoose error detected, sir")
);

module.exports = mongoose;
