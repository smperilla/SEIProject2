const express = require("express");
const router = express.Router();
const Fortune = require("../models/fortune");

router.get("/", async (req, res) => {
  let fortunes = await Fortune.find();
  let randFortune = fortunes[[Math.floor(Math.random() * fortunes.length)]];
  res.render("fortune/index.ejs", { fortunes, randFortune });
});

router.get("/seed", async (req, res) => {
  await Fortune.deleteMany({});
  let seededFortunes = await Fortune.create([
    {
      name: "Millionaire",
      description: "You are destined to become a millionaire!",
      likelihood: 0.1,
      hasComeTrue: false,
    },
    {
      name: "Zoo",
      description: "You will one day own a zoo!",
      likelihood: 0.9,
      hasComeTrue: true,
    },
    {
      name: "Married",
      description: "You will be happily married five times!",
      likelihood: 1,
      hasComeTrue: true,
    },
    {
      name: "President",
      description: "You will be the last President of the United States!",
      likelihood: 1,
      hasComeTrue: true,
    },
    {
      name: "Rain",
      description: "You will never see rain for the rest of your life.",
      likelihood: 1,
      hasComeTrue: true,
    },
    {
      name: "Married",
      description: "You will be happily married...five times!",
      likelihood: 1,
      hasComeTrue: true,
    },
    {
      name: "Friends",
      description:
        "You will have hundreds of friends, and they will call you at the same time",
      likelihood: 1,
      hasComeTrue: true,
    },
    {
      name: "Aliens",
      description: "You'll be abducted by aliens, and it will be a great time",
      likelihood: 1,
      hasComeTrue: true,
    },
  ]);
  res.send(seededFortunes);
});

module.exports = router;
