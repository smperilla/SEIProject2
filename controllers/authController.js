const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

router.get("/login", (req, res) => {
  res.send("login page");
});

module.exports = router;
