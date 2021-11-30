const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const path = require("path");
const hbs = require("hbs");
const publicPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../template");
const partialsPath = path.join(__dirname, "../template/partials");
const userRoute = require("./route/user");
const mongoose = require("../src/db/mongoose");
app.use(express.static(publicPath));
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsPath);
hbs.registerHelper("baseurl", function (value) {
  return process.env.BASEURL;
});
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(
  session({
    key: "user_sid",
    secret: "someSecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 600000,
    },
  })
);

app.use(userRoute);

app.get("/", (req, res) => {
  res.redirect("/user");
});

module.exports = app;
