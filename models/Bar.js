var mongoose = require('mongoose');
var Schema = require('mongoose').Schema;

var BarSchema = mongoose.Schema({
    _id: {
        type: String,
        index: true
    },
    name: String,
    going: Number,
    url: String,
    offset: Number,
    date: String
});

var Bar = module.exports = mongoose.model('Bar', BarSchema);