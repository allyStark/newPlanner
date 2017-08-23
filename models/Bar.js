const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const BarSchema = mongoose.Schema({
    _id: {
        type: String,
        index: true
    },
    name: String,
    going: Number,
    url: String,
    offset: Number,
    date: String,
    attending: [String]
});

const Bar = module.exports = mongoose.model('Bar', BarSchema);