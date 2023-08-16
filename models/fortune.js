const mongoose = require("../db/connection");
const fortuneSchema = new mongoose.Schema({
  name: String,
  description: String,
  likelihood: Number,
  hasComeTrue: Boolean,
});

const Fortune = new mongoose.model("Fortune", fortuneSchema);
module.exports = Fortune;
