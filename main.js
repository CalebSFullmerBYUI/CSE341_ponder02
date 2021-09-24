const express = require("express");
const bodyParser = require('body-parser');
const path = require("path");

const app = express();
const prove02Route = require("./routes/prove02");

app.set("views", path.join(__dirname, "views"))
    .set("view engine", "ejs")
    .use(bodyParser({ extended: false }))
    .use("/", prove02Route)
    .listen(process.env.PORT || 5000, () => {
        console.log("Listening for input.");
    });