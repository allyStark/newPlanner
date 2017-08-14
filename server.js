var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//client
app.use(express.static('static'));

//DB
// mongoose.connect('mongodb://localhost/planner', function(err){
//     if(err){
//         console.log("Not connected to DB");
//     } else {
//         console.log("Connected to DB");
//     }
// })

//use bodyparser
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//listen for connection
app.listen(3000, function(){
    console.log("Connected to server");
})