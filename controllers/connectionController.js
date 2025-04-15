"use strict";
const { DateTime } = require("luxon");
const model = require("../models/events");
const users = require('../models/users');
const rsvps = require('../models/rsvp');

// GET /connections - send all connections to user
exports.index = (req, res, next) => {
    model.find()
    .then(events => res.render("./connections/index", {events}))
    .catch(err => next(err));
};

// GET /connections/new - send form for creating a new connection
exports.new = (req, res) => {
    res.render("./connections/new");
};

// POST /connections - create a new event
exports.create = (req, res) => {
    // create new event
    let connection = new model({
        type: req.body.type,
        url: req.body.url,
        title: req.body.title,
        createdBy: req.session.user,
        host: req.body.host,
        rawDatetime: { // used for loading times and dates into edit.ejs
            startDate: req.body.startdate,
            startTime: req.body.starttime,
            endDate: req.body.enddate,
            endTime: req.body.endtime
        },
        datetime: DateTime.fromISO(req.body.startdate).toLocaleString(DateTime.DATE_MED) + ", " + DateTime.fromISO(req.body.starttime).toLocaleString(DateTime.TIME_SIMPLE),
        endTime: DateTime.fromISO(req.body.enddate).toLocaleString(DateTime.DATE_MED) + ", " + DateTime.fromISO(req.body.endtime).toLocaleString(DateTime.TIME_SIMPLE),
        location: req.body.location,
        details: req.body.details,
        numberGoing: 0
    });
    // insert event to database
    connection.save()
    .then(() => res.redirect('/connections'))
    .catch(err => {
        if (err.name === 'ValidationError') {
            err.status = 400;
        }
        next(err);
    });
};

// GET /connections/:id - send connection of type with id
exports.show = (req, res, next) => {
    let id = req.params.id;
    model.findById(id)
    .then(connection => {
        if (connection) {
            res.render("./connections/show", {connection});
        } else {
            let err = new Error("Could not find event with id " + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err => next(err));
};

// GET /connections/:type/:id/edit - edit an existing connection
exports.edit = (req, res, next) => {
    let id = req.params.id;
    model.findById(id)
    .then(connection => {
        if (connection) {
            res.render("./connections/edit", {connection});
        } else {
            let err = new Error("Could not find event with id " + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err => next(err));
};

// PUT /connections/:type/:id - update connection of type with id
exports.update = (req, res, next) => {
    let id = req.params.id;
    model.findById(id)
    .then(result => {
        let connection = {
            id: "",
            type: req.body.type,
            url: req.body.url,
            title: req.body.title,
            host: req.body.host,
            rawDatetime: { // used for loading times and dates into edit.ejs
                startDate: req.body.startdate,
                startTime: req.body.starttime,
                endDate: req.body.enddate,
                endTime: req.body.endtime
            },
            datetime: DateTime.fromISO(req.body.startdate).toLocaleString(DateTime.DATE_MED) + ", " + DateTime.fromISO(req.body.starttime).toLocaleString(DateTime.TIME_SIMPLE),
            endTime: DateTime.fromISO(req.body.enddate).toLocaleString(DateTime.DATE_MED) + ", " + DateTime.fromISO(req.body.endtime).toLocaleString(DateTime.TIME_SIMPLE),
            location: req.body.location,
            details: req.body.details,
            numberGoing: result.numberGoing
        };
        model.findByIdAndUpdate(id, connection, {useFindAndModify: false, runValidators: true})
        .then(connection => {
            if (connection) {
                res.redirect("/connections/" + id);
            } else {
                let err = new Error("Could not find event with id " + id);
                err.status = 404;
                next(err);
            }
        })
        .catch(err => next(err));
    })
    .catch(err => next(err));
    
};

// DELETE /connections/:type/:id - delete connection of type with id
exports.delete = (req, res, next) => {
    let id = req.params.id;
    model.findByIdAndDelete(id, {useFindAndModify: false})
    .then(connection => {
        if (connection) {
            rsvps.deleteMany({connection: connection.id})
            .then(() => {
                res.redirect("/connections");
            })
            .catch(err => next(err));
        } else {
            let err = new Error("Could not find event with id " + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err => next(err));
};

// POST /connections/:id/going - user is going to connection with id
exports.going = (req, res, next) => {
    let id = req.params.id;
    let user = req.session.user;

    model.findById(id)
    .then(eventGoing => {
        rsvps.findOneAndUpdate({connection: id, user: user}, {connection: id, title: eventGoing.title, type: eventGoing.type, user: user}, {useFindAndModify: false, upsert: true})
        .then(rsvp => {
            if (!rsvp) {
                eventGoing.numberGoing += 1;
                model.findByIdAndUpdate(id, eventGoing)
                .then(() => {
                    req.flash('success', "Successfully updated your RSVP status!");
                    res.redirect('/connections/' + id);
                })
                .catch(err => next(err));
            } else {
                req.flash('error', "You have already RSVP'd for this event");  
                res.redirect('/connections/' + id);
            }
        })
        .catch(err => next(err));
    });
};

// POST /connections/:id/notgoing - user is not going to connection with id
exports.notGoing = (req, res, next) => {
    let id = req.params.id;
    let user = req.session.user;
    model.findById(id)
    .then(eventGoing => {
        rsvps.findOneAndDelete({connection: id, user: user}, {useFindAndModify: false})
        .then(rsvp => {
            if (rsvp) {
                eventGoing.numberGoing -= 1;
                model.findByIdAndUpdate(id, eventGoing)
                .then(() => {
                    req.flash('success', "Successfully updated your RSVP status!");
                    res.redirect('/connections/' + id);
                })
                .catch(err => next(err));
            } else {
                req.flash('error', "You have not RSVP'd for this event");  
                res.redirect('/connections/' + id);
            }
        })
        .catch(err => next(err));
    })
    .catch(err => next(err));
};