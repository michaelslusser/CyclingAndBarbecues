"use strict";
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rsvpSchema = new Schema(
    {
        connection: {type: Schema.Types.ObjectId, ref: 'Event'},
        title: {type: String, ref: 'Event'},
        type: {type: String, ref: 'Event'},
        user: {type: Schema.Types.ObjectId, ref: 'User'}
    }
)

// collection name is rsvps in database
module.exports = mongoose.model('RSVP', rsvpSchema);