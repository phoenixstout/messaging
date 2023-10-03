const express = require("express");
const router = express.Router();
const friendController = require("../controllers/friendController.js");
const passport = require("passport");

router.route('/').get(verifyToken,friendController.getIndex)
router.route('/requests')
  .get(verifyToken, friendController.getRequests)
  .put(verifyToken, friendController.putRequests)


function verifyToken(req, res, next) {
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== "undefined") {
      const bearer = bearerHeader.split(" ");
      const bearerToken = bearer[1];
      req.token = bearerToken;
      next();
    } else {
      res.sendStatus(403);
    }
  }

module.exports = router