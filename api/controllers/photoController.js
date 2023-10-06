const jwt = require("jsonwebtoken");
const User = require("../models/User");
const fs = require("fs");

exports.getProfilePic = async (req, res) => {
  const url = await User.find({username: req.params.user}).select('profile_pic -_id')
  res.sendFile(url[0].profile_pic)
}

exports.postPhoto = async (req, res) => {
  jwt.verify(req.token, process.env.JWTSECRET, async (err, authData) => {
    const user = await User.find({ _id: authData.user_id });
    const current_profile_pic = user[0].profile_pic;
    if (current_profile_pic) {
      fs.unlink(current_profile_pic, (err) => {
        if (err) console.log(err);
      });
    }
    const update = await User.updateOne(
      { _id: authData.user_id },
      { profile_pic: req.file.path }
    );
  });
  res.json({});
};

