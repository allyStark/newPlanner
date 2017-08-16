var mongoose = require('mongoose');
var Schema = require('mongoose').Schema;

var BarSchema = mongoose.Schema({
    _id: {
        type: String,
        index: true
    }
});