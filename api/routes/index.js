const express = require("express");
const router = express.Router();
const indexController = require("../controllers/indexController.js");

router.route('/').get(indexController.get);


module.exports = router;
