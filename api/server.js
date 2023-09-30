const express = require('express')
const app = express()

app.use(express.urlencoded({ extended: false }));
app.use(express.json())

const indexRouter = require('./routes/index.js')
app.use(indexRouter)

app.listen(3000, () => 'app listening on port 3000')