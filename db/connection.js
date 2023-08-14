const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://smperilla:iZuuJGvAkShTzRJi@sei.9dvatye.mongodb.net/FortuneTeller"
);
mongoose.connection.on("connected", () =>
  console.log("Mongoose connected, sir")
);
mongoose.connection.on("error", () =>
  console.log("Mongoose error detected, sir")
);

module.exports = mongoose;
