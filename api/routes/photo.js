const express = require("express");
const router = express.Router();
const photoController = require("../controllers/photoController.js");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public/images/"));
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + "." + file.mimetype.split("/")[1]
    );
  },
});
const upload = multer({ storage: storage });

router
  .route("/")
  .post(verifyToken, upload.single("file"), photoController.postPhoto);


router.route('/:user')
.get(photoController.getProfilePic)

function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
  } else {
    return res.sendStatus(403);
  }
  next();
}

module.exports = router;
