const express = require("express");
const router = express.Router();
const Fortune = require("../models/fortune");
const Order = require("../models/order");

router.get("/", async (req, res) => {
  let fortunes = await Fortune.find();
  let randFortune = fortunes[[Math.floor(Math.random() * fortunes.length)]];
  res.render("fortune/index.ejs", { fortunes, randFortune });
});

router.get("/all", async (req, res) => {
  let fortunes = await Fortune.find();
  res.render("fortune/all.ejs", { fortunes });
});

router.get("/seed", async (req, res) => {
  await Order.deleteMany({});
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
    {
      name: "Whirlwind",
      description:
        "You will sneeze so hard that you'll launch into a parallel universe of perpetual sneezing.",
      likelihood: 1,
      hasComeTrue: false,
    },
    {
      name: "Vanishing",
      description:
        "You'll find an invisible chair to sit on, only to realize it was a cleverly disguised pile of wet paint.",
      likelihood: 0.8,
      hasComeTrue: true,
    },
    {
      name: "Boogie",
      description:
        "You'll break into spontaneous dance at the most inappropriate time, sparking an unexpected dance-off.",
      likelihood: 0.6,
      hasComeTrue: false,
    },
    {
      name: "Deluge",
      description:
        "Opening a celebration popper will reveal a surprise confetti storm that covers your entire home.",
      likelihood: 0.5,
      hasComeTrue: true,
    },
    {
      name: "Irony",
      description:
        "Your attempts at reverse psychology will work a little too well, leaving everyone confused and frustrated.",
      likelihood: 0.7,
      hasComeTrue: false,
    },
    {
      name: "Kazoo",
      description:
        "You'll suddenly become a musical prodigy but only for playing the kazoo, earning both applause and bewilderment.",
      likelihood: 0.5,
      hasComeTrue: true,
    },
    {
      name: "Sprout",
      description:
        "You'll discover the fountain of youth but accidentally spill it, causing nearby plants to grow alarmingly young.",
      likelihood: 1,
      hasComeTrue: false,
    },
    {
      name: "Chatter",
      description:
        "Your pet will start talking, but their conversation topics will revolve solely around existential cat problems.",
      likelihood: 0.6,
      hasComeTrue: true,
    },
    {
      name: "Mower",
      description:
        "You'll meet a unicorn, but its main interest will be borrowing your lawnmower for a magical lawn makeover.",
      likelihood: 0.8,
      hasComeTrue: false,
    },
    {
      name: "Jitterbug",
      description:
        "After consuming an excessive amount of coffee, you'll vibrate into another dimension, reaching peak jitterbug levels.",
      likelihood: 1,
      hasComeTrue: true,
    },
  ]);
  res.send(seededFortunes);
});

//INDEX
router.get("/order", async (req, res) => {
  const orders = await Order.find({ userId: req.session.userId })
    .populate("fortunes")
    .populate("userId");
  res.render("order/index.ejs", { orders });
});

//NEW
router.get("/new", async (req, res) => {
  res.render("fortune/new.ejs");
});

//DELETE ORDER
router.delete("/order/:id", async (req, res) => {
  console.log("DELETING ORDER");
  const id = req.params.id;
  await Order.findByIdAndRemove(id);
  res.redirect("/fortune/order");
});

//DELETE FORTUNE
router.delete("/:id", async (req, res) => {
  console.log("DELETING FORTUNE");
  const id = req.params.id;
  await Fortune.findByIdAndRemove(id);
  res.redirect("/fortune/all");
});

//UPDATE
router.put("/order/:id", async (req, res) => {
  console.log("UPDATE ROUTE");
  console.log(req.body);
  const id = req.params.id;
  let response = await Fortune.findByIdAndUpdate(id, req.body, { new: true });
  console.log(response);
  return;
});

//CREATE
//RANDOMIZED
router.post("/order", async (req, res) => {
  let fortunes = await Fortune.find({ _id: { $in: req.body.fortunes } });
  req.body.userId = req.session.userId;

  let total = 0;
  req.body.fortunes.forEach(
    (fortune) =>
      (total += fortunes.find((c) => {
        return c._id.toString() == fortune;
      }).likelihood)
  );

  console.log(total);
  req.body.total = total;
  let newOrder = await Order.create(req.body);
  res.json(newOrder);
});

//CREATE NEW
router.post("/", async (req, res) => {
  const createdFortune = await Fortune.create(req.body);
  res.redirect("/fortune/all");
});

//EDIT
router.get("/:id/edit", async (req, res) => {
  const foundOrder = await Order.findById(req.params.id).populate("fortunes");
  console.log(foundOrder);
  res.render("order/edit.ejs", { foundOrder });
});

//SHOW
router.get("/order/:id", async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate("fortunes")
    .populate("userId");
  console.log(order);
  res.render("order/show.ejs", { order });
});

module.exports = router;
