const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const cors = require("cors");
const path = require("path");
const photoController = require("./controllers/photoController.js");
const User = require("./models/User.js");

require("dotenv").config();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.static(path.join(__dirname, "/public")));

mongoose.connect(process.env.MONGOURI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));
db.once("open", () => console.log("connected"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));

require("./config/passport.js");
app.use(passport.initialize());
app.use(passport.session());

const indexRouter = require("./routes/index.js");
app.use(indexRouter);

const friendRouter = require("./routes/friends.js");
app.use("/user/:user_id/", friendRouter);

const photoRouter = require("./routes/photo.js");
app.use("/photo", photoRouter);

app.get("/friends/:friend_id/profilepic", async (req, res) => {
  const profile_pic = await User.find({ _id: req.params.friend_id }).select(
    "profile_pic username -_id"
  );
  res.json(profile_pic[0]);
});

app.get("/users/:username", async (req, res) => {
  const pipe = [
    {
      $search: {
        'index': "autocomplete",
        'autocomplete': { query: req.params.username, path: "username" },
      },
    },
    { $limit: 5 },
    { $project: { _id: 1, username: 1 } },
  ];
  const user = await User.aggregate(pipe).exec();

  res.json({users:user});
});

app.listen(80, () => "app listening on port 80");
