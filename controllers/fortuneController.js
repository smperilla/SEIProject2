const express = require("express");
const router = express.Router();
const Fortune = require("../models/fortune");
const Order = require("../models/order");

router.get("/", async (req, res) => {
  let fortunes = await Fortune.find();
  let randFortune = fortunes[[Math.floor(Math.random() * fortunes.length)]];
  res.render("fortune/index.ejs", { fortunes, randFortune });
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

//DELETE
router.delete("/order/:id", async (req, res) => {
  console.log("DELETING");
  const id = req.params.id;
  await Order.findByIdAndRemove(id);
  res.send("deleted");
});

//UPDATE
router.put("/order/:id", async (req, res) => {
  console.log("UPDATE ROUTE");
  const id = req.params.id;
  await Order.findByIdAndUpdate(id, req.body, { new: true });
  console.log(JSON.stringify(Order.fortunes));
  return;
});

//CREATE
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

//EDIT
router.get("/:id/edit", async (req, res) => {
  const foundOrder = await Order.findById(req.params.id);
  res.render("order/edit.ejs");
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
