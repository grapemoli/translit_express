const mongoose = require('mongoose');
const Book = require('./book')

const schema = new mongoose.Schema({
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true,
        index: true
    },

    chapter: {
        type: Number,
        min: 1
    },

    verse: {
        type: Number,
        min: 1,
        max: 176
    },

    version: {
        type: String,
        trim: true,
        required: true,
        index: true
    },

    language: {
        type: String,
        trim: true,
        required: true
    },

    date: {
        type:  Date,
        required: true,
        index: true
    }
});

module.exports = mongoose.model('Saved', schema);