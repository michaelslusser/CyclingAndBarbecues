"use strict";
const users = require('../models/users');

// GET / - load index/home page
exports.index = (req, res) => {
    res.render("./index");
}

// GET /about - load about page
exports.about = (req, res) => {
    res.render("./about");
}

// GET /contact - load contact page
exports.contact = (req, res) => {
    res.render("./contact");
}