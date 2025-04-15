"use strict";
const express = require("express");
const controller = require("../controllers/connectionController");
const {isLoggedIn, isCreator, notCreator} = require('../middleware/auth');
const{validateId, validateEvent} = require('../middleware/validator');

const router = express.Router();

// GET /connections - send all connections to user
router.get("/", controller.index);

// GET /connections/new - send form for creating a new connection
router.get("/new", isLoggedIn, controller.new);

// POST /connections - create a new event
router.post("/", isLoggedIn, validateEvent, controller.create);

// GET /connections/:id - send connection with id
router.get("/:id", validateId, controller.show);

// GET /connections/:id/edit - edit an existing connection
router.get("/:id/edit", validateId, isLoggedIn, isCreator, controller.edit);

// PUT /connections/:id - update connection with id
router.put("/:id", validateId, isLoggedIn, isCreator, validateEvent, controller.update);

// DELETE /connections/:id - delete connection with id
router.delete("/:id", validateId, isLoggedIn, isCreator, controller.delete);

// POST /connections/:id/going - user is going to connection with id
router.post('/:id/going', validateId, isLoggedIn, notCreator, controller.going);

// POST /connections/:id/notgoing - user is not going to connection with id
router.post('/:id/notgoing', validateId, isLoggedIn, notCreator, controller.notGoing);

module.exports = router;