require("dotenv").config()
require("./config/database")

const express = require('express');
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const cors = require('cors')

const userRouter = require("./routes/user")

const app = express();
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false, limit:'50mb' }))
app.use(bodyParser.json({limit:'50mb'}))
app.use(cookieParser())

app.use("/user", userRouter)

app.get("/", (req, res) => {
    res.send("Welcome!")
})

app.listen(5000,() => {
    console.log("Server listening on port 5000")
})