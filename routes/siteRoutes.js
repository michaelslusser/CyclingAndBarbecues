"use strict";
const express = require("express");
const controller = require("../controllers/siteController");
const router = express.Router();

// GET / - load index/home page
router.get("/", controller.index);

// GET /about - load about page
router.get("/about", controller.about);

// GET /contact - load contact page
router.get("/contact", controller.contact);

module.exports = router;