"use strict";
// modules
const express = require("express");
const morgan = require("morgan");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const connectionRoutes = require("./routes/connectionRoutes");
const siteRoutes = require("./routes/siteRoutes");
const userRoutes = require('./routes/userRoutes');

// create app
const app = express();

// configure app
let port = 8080;
let host = "localhost";
let url = "mongodb://localhost:27017/NBAD"; // use NBAD database
app.set("view engine", "ejs");

// connect to MongoDB
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    // start server
    app.listen(port, host, () => {
        console.log("Server running on port ", port);
        console.log('http://localhost:8080/');
    });
})
.catch(err => console.log(err.message));

// middleware mounting
app.use(
    session({
        secret: "", // input any random string of characters or digits here
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({mongoUrl: 'mongodb://localhost:27017/demos'}),
        cookie: {maxAge: 60*60*1000}
        })
);
app.use(flash());
app.use((req, res, next) => {
    res.locals.user = req.session.user||null;
    res.locals.errorMessages = req.flash('error');
    res.locals.successMessages = req.flash('success');
    next();
});
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));
app.use(morgan("tiny"));
app.use(methodOverride("_method"));

// routing
app.use("/", siteRoutes);

app.use("/connections", connectionRoutes);

app.use('/user', userRoutes);

app.use((req, res, next) => {
    let err = new Error("The server could not locate " + req.url);
    err.status = 404;
    next(err);
})

app.use((err, req, res, next) => {
    console.log(err.stack);
    if (!err.status) {
        err.status = 500;
        err.message = ("Internal Server Error");
    }
    res.status(err.status);
    res.render("error", {error: err});
});