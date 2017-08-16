const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const axios = require('axios');

//client
app.use(express.static('static'));
//TODO make a database entry when a bar name is clicked on
//DB
mongoose.connect('mongodb://localhost/planner', function(err){
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

//TODO use these as environment variables for production
const yelpToken = {
                access_token: "0NcJTYLBaovwIPpsNfz0-c0MX4q1PhNcJ9QoldlQLxHgx2yKh6Y66Cmyd2Gd4jv7ElR_o8h4PNuB_uYsFUCqdBpUKc4J_PKPyHJ4ZZ5i4JugWVWrKMxido5qST-SWXYx",
                expires_in: 15551999,
                token_type: "Bearer"
                }
//set axios auth header
//TODO script that requests new bearer token if current one is invalid
axios.defaults.headers.common['Authorization'] = 'Bearer 0NcJTYLBaovwIPpsNfz0-c0MX4q1PhNcJ9QoldlQLxHgx2yKh6Y66Cmyd2Gd4jv7ElR_o8h4PNuB_uYsFUCqdBpUKc4J_PKPyHJ4ZZ5i4JugWVWrKMxido5qST-SWXYx';

//endpoint to make request to yelp
app.post('/api/places',(req, res) => {
    let location = req.body.location;
    axios.get('https://api.yelp.com/v3/businesses/search?location=' + location + '&term=bar').then((data) => {
        //console.log(data);
        let bars = data.data;
        //TODO check against db. If entry exists, replace entry with db entry
        res.send(bars);
    }).catch((error => {
        console.log(error);
    }));
});
//make request for going
app.post('/api/going',(req, res) => {
    //TODO does the db entry exist already?
    var lat = req.body.lat;
    var lon = req.body.lon;

    //get time zone bar is in using timezone db. Use only if there is no entry already in the database
    axios.get('http://api.timezonedb.com/v2/get-time-zone?key=HRB5I8FLTT7K&format=json&by=position&lat=' + lat + '&lng=' + lon)
    .then((data) => {
        console.log(data.data);
        let todayDate = data.data.formatted.split(" ");
        todayDate = todayDate[0];
        console.log(todayDate);
    }).catch((error) => {
        console.log(error);
    });
    //console.log(req.body);
    res.send(req.body);
});


//listen for connection
app.listen(3000, () => {
    console.log("Connected to server");
})