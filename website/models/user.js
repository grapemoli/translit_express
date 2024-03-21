const mongoose = require('mongoose');
const Saved = require('./saved');
const bcrypt = require('bcrypt');

const schema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        trim: true,
        required: true,
        index: true
    },

    password: {
        type: String,
        trim: true,
        required: true,
        index: true
    },

    email: {
        type: String,
        unique: true,
        trim: true
    },

    saved: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Saved'
    }
});



module.exports = mongoose.model('User', schema);