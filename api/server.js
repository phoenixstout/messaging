const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const cors = require('cors')
const path = require('path')
const photoController = require('./controllers/photoController.js')


require("dotenv").config();

app.use(cors({
  origin: "http://localhost:5173"
}))

app.use(express.static(path.join(__dirname, '/public')))

mongoose.connect(process.env.MONGOURI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongo connection error'))
db.once('open', () => console.log('connected'))


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));

require('./config/passport.js')
app.use(passport.initialize());
app.use(passport.session());

const indexRouter = require("./routes/index.js");
app.use(indexRouter);

const friendRouter = require('./routes/friends.js')
app.use('/friends', friendRouter)

const photoRouter = require('./routes/photo.js')
app.use('/photo', photoRouter)

app.listen(3000, () => "app listening on port 3000");

