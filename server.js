const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//client
app.use(express.static('static'));
//connect to mongo
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/nightlife', function(err){
    if(err){
        console.log("Not connected to DB");
    } else {
        console.log("Connected to DB");
    }
});

//use bodyparser
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//routes
app.use(require("./router"));

//listen for connection
app.listen(process.env.PORT || 3000, () => {
    console.log("Connected to server");
});