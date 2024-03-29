const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        index: true
    },

    testament: {
        type: String,
        required: true,
        index: true,
        enum: ['OLD', 'NEW']
    },

    altNames: {
        type: [String]
    },

    rank: {
        type: Number,
        min: 1
    }
},
    {
        collection: 'Book'
    });

module.exports = mongoose.model('Book', bookSchema);