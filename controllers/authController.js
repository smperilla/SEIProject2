const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

router.get("/login", (req, res) => {
  res.render("auth/login");
});

router.get("/signup", (req, res) => {
  res.render("auth/signup");
});

router.post("/signup", async (req, res) => {
  if (req.body.username && req.body.password) {
    let plainTextPassword = req.body.password;
    bcrypt.hash(plainTextPassword, 10, async (err, hashedPassword) => {
      req.body.password = hashedPassword;
      let newUser = await User.create(req.body);
      res.send(newUser);
    });
  }
});

module.exports = router;
