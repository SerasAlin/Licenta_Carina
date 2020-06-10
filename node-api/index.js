const express = require("express");
const bodyParser = require("body-parser");
const user = require("./routes/user");
const animal = require("./routes/animal");
const admin = require("./routes/admin");
const post = require("./routes/post");
const InitiateMongoServer = require("./config/db");

// Initiate Mongo Server
InitiateMongoServer();

const app = express();

// PORT
const PORT = process.env.PORT || 4000;

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
};

app.use(allowCrossDomain);

// Middleware
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.json({ message: "API Working" });
});


/**
 * Router Middleware
 * Router - /user/*
 * Method - *
 */
app.use("/user", user);
app.use("/animal", animal);
app.use("/admin", admin);
app.use("/post", post);

app.listen(PORT, (req, res) => {
    console.log(`Server Started at PORT ${PORT}`);
});