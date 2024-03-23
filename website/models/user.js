const mongoose = require('mongoose');
const Saved = require('./saved');
const bcrypt = require('bcrypt');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const userSchema = new mongoose.Schema({
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
        sparse: true,
        trim: true
    },

    saved: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Saved'
    }
},
    {
        collection: 'User'
    });

module.exports = mongoose.model('User', userSchema);