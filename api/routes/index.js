const express = require("express");
const router = express.Router();
const indexController = require("../controllers/indexController.js");

router.route('/').get(indexController.get);

router.route('/signup').post(indexController.postSignup)


module.exports = router;
