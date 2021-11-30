const express = require("express");
const router = express.Router();
const { saveUser, saveUserData } = require("../controller/userController");
const Users = require("../model/User");
//user
router.post("/user", async (req, res) => {
  if (req.body.mobile) {
    const mobile = req.body.mobile;
    let userData = await Users.findOne({ mobile });
    if (userData == null) {
      userData = true;
    } else {
      userData = false;
    }
    res.render("./user/otp", { mob: mobile, user: userData, message: false });
  } else {
    res.render("/login");
  }
});

//load otp page
router.get("/otp", async (req, res) => {
  const userName = "";
  res.render("user/otp");
});

// validate otp
router.post("/otp", async (req, res) => {
  try {
    const data = await saveUser(res, { ...req.body });
    res.render("user/home");
  } catch (error) {
    res.render("./user/otp", {
      mob: req.body.mobile,
      user: req.body.name,
      message: true,
      error: error.message,
    });
  }
});

router.get("/login", async (req, res) => {
  res.render("user/login");
});

router.get("/home", async (req, res) => {
  res.render("user/home");
});

router.post("/adddata", async (req, res) => {
  try {
    saveUserData(req, res);
  } catch (error) {
    // res.status(400).send(error.message);
  }
});

module.exports = router;
