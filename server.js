const express = require("express");
const app = express();
const PORT = 3000;
const expressLayouts = require("express-ejs-layouts");
const authRoutes = require("./controllers/authController");
const session = require("express-session");
const fortuneRoutes = require("./controllers/fortuneController");
const mongoose = require("mongoose");
console.log(mongoose.version);

app.set("view engine", "ejs");

//MIDDLEWARES
app.use(express.static("public"));
app.use(expressLayouts);
app.use(session({ secret: "somestring", cookie: { maxAge: 3600000 } }));
app.use(express.json());

//Form Data
app.use(express.urlencoded({ extended: true }));

app.use(authRoutes);

app.get("/", (req, res) => {
  res.render("home.ejs");
});

// app.use("/fortuneteller", fortuneRoutes);

app.use("/fortune", fortuneRoutes);

app.listen(PORT, () => console.log("Fortune teller port confirmed", PORT));
