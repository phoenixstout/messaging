const express = require("express");
const router = express.Router();
const indexController = require("../controllers/indexController.js");
const passport = require("passport");

router.route("/").get(indexController.get);

router.route("/signup").post(indexController.postSignup);

router
  .route("/login")
  .post(passport.authenticate("local"), indexController.postLogin);

module.exports = router;
