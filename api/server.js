const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGOURI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongo connection error'))
db.once('open', () => console.log('connected'))

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const indexRouter = require("./routes/index.js");
app.use(indexRouter);

app.listen(3000, () => "app listening on port 3000");
