const mongoose = require("../db/connection");

const orderSchema = new mongoose.Schema({
  userId: { ref: "User", type: mongoose.Schema.Types.ObjectId },
  fortunes: [{ ref: "Fortune", type: mongoose.Schema.Types.ObjectId }],
  total: Number,
});

const Order = new mongoose.model("Order", orderSchema);

module.exports = Order;
