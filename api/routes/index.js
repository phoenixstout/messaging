const express = require("express");
const router = express.Router();
const indexController = require("../controllers/indexController.js");
const passport = require("passport");

router.route("/").get(indexController.get);

router.route("/signup").post(indexController.postSignup);

router
  .route("/login")
  .post(passport.authenticate("local"), indexController.postLogin);


function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
  } else {
    return res.sendStatus(403);
  }
}

module.exports = router;
