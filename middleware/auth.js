'use strict';
const Events = require('../models/events');

// check if user is a guest
exports.isGuest = (req, res, next)=>{
    if (!req.session.user) {
        return next();
    } else {
        req.flash('error', 'You are already logged in!');
        return res.redirect('/user/profile');
    }
};

// check if user is authenticated
exports.isLoggedIn = (req, res, next) =>{
    if (req.session.user) {
        return next();
    } else {
        req.flash('error', 'You need to log in first!');
        return res.redirect('/user/login');
    }
};

// check if user is creator of the event
exports.isCreator = (req, res, next) =>{
    let id = req.params.id;
    Events.findById(id)
    .then(connection => {
        if (connection) {
            if(connection.createdBy == req.session.user) {
                return next();
            } else {
                let err = new Error('Unauthorized to access the resource');
                err.status = 401;
                return next(err);
            }
        } else {
            let err = new Error("Could not find event with id " + id);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err=>next(err));
};

// check if user is not creator of the event
exports.notCreator = (req, res, next) =>{
    let id = req.params.id;
    Events.findById(id)
    .then(connection => {
        if (connection) {
            if(connection.createdBy != req.session.user) {
                return next();
            } else {
                let err = new Error('Unauthorized to access the resource');
                err.status = 401;
                return next(err);
            }
        } else {
            let err = new Error("Could not find event with id " + id);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err=>next(err));
};