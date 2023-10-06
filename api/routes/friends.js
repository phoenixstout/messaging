const express = require("express");
const router = express.Router();
const friendController = require("../controllers/friendController.js");
const passport = require("passport");
const photoController = require('../controllers/photoController.js')

router.route('/friends').get(verifyToken,friendController.getIndex)
router.route('/friends/requests')
  .get(verifyToken, friendController.getRequests)
  .put(verifyToken, friendController.putRequests)
  .post(verifyToken, friendController.postRequests)


router.route('/conversation/:friend_id').get(verifyToken, friendController.getConversation).post(verifyToken, friendController.postConversation)

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