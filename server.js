const express = require("express");
const app = express();
const PORT = 3000;
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const authRoutes = require("./controllers/authController");

app.set("view engine", "ejs");

//MIDDLEWARES
app.use(express.static("public"));
app.use(expressLayouts);

//Form Data
app.use(express.urlencoded({ extended: true }));

app.use(authRoutes);

app.get("/", (req, res) => {
  res.send("FortuneTeller");
});

app.listen(PORT, () => console.log("Fortune teller port confirmed", PORT));
