const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const axios = require('axios');
const strftime = require('strftime');

var Bar = require('./models/Bar');

console.log(getDate(-14400 * 1000));

//client
app.use(express.static('static'));
//TODO make a database entry when a bar name is clicked on
//DB
mongoose.connect('mongodb://localhost/bar', function(err){
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

        let businesses = data.data.businesses;     
        let lon = businesses[0].coordinates.longitude;
        let lat = businesses[0].coordinates.latitude;
        //res.send(JSON.stringify(businesses));
        axios.get('http://api.timezonedb.com/v2/get-time-zone?key=HRB5I8FLTT7K&format=json&by=position&lat=' + lat + '&lng=' + lon)
            .then((timeData) => {

                let todayDate = timeData.data.formatted.split(" ");
                todayDate = todayDate[0];
                let offset = timeData.data.gmtOffset;
                let sendArray = [];

                function checkForBars(i){

                    if(sendArray.length === businesses.length){
                        res.end(JSON.stringify(sendArray));
                        return;
                    }

                    let barData = businesses[i];

                    Bar.findOne({ _id: barData.id}, (err, barEntry) => {
                        if(err) throw err;
                        //if the bar exists, check to see if the date matches. If it does, return the bar as is,
                        //if it doesn't, update the date to the current date and set the going field to 0
                        if(barEntry !== null && barEntry.date !== todayDate){
                                                
                            barEntry.date = todayDate;
                            barEntry.going = 0;

                            barEntry.save((err) => {
                                if(err) throw err;
                                sendArray.push(barEntry);
                                checkForBars(i + 1);
                            });

                        } else if (barEntry === null){
                            //create and save the new entry
                            let newBar = new Bar({
                                _id: barData.id,
                                name: barData.name,
                                going: 0,
                                url: barData.url,
                                offset: offset * 1000,
                                date: todayDate
                            });

                            newBar.save((err) => {
                                if(err) throw err;
                                sendArray.push(newBar);
                                checkForBars(i + 1);
                            });

                        } else {
                            sendArray.push(barEntry);
                            checkForBars(i + 1);
                        }
                    });
                }

            checkForBars(0);

            }).catch((error) => {
                console.log(error);
            });
        
    }).catch((error => {
        console.log(error);
    }));
});
//make request to go to a bar
app.post('/api/going',(req, res) => {

    let barId = req.body.barId;

    Bar.findOne({ '_id': barId }, (err, bar) => {
        if(err) throw err;

        if(bar ==  null){
            //no bar entry? Create a new db entry
            //get date bar is in using timezone db. Use only if there is no entry already in the database
            axios.get('http://api.timezonedb.com/v2/get-time-zone?key=HRB5I8FLTT7K&format=json&by=position&lat=' + req.body.lat + '&lng=' + req.body.lon)
            .then((data) => {
                let todayDate = data.data.formatted.split(" ");
                console.log(data.data);
                //create new mongo entry
                var newBar = new Bar({
                    _id: barId,
                    going: 1,
                    offset: data.data.gmtOffset * 1000,
                    date: todayDate[0]
                });

                newBar.save((err) => {
                    if(err){
                        throw err;
                    } else {
                        console.log(newBar);
                    }
                    res.end(JSON.stringify(newBar));
                });
                
            }).catch((error) => {
                console.log(error);
            });

        } else {
            let currentBarDate = getDate(bar.offset);
            //check if the date has expired. If it has, set going to 1 and put in the new date
            if(bar.date !== currentBarDate){
                //this is a rare case! If the date changes while the user is using the application, this will update accordingly
                bar.going = 1;
                bar.date = currentBarDate;
                bar.save((err, bar) => {
                    if(err) throw err;
                    res.end(JSON.stringify(bar));
                });
            } else {
                //update database going by 1.
                bar.going = bar.going + 1;
                bar.save((err, bar) => {
                    if(err) throw err;
                    res.end(JSON.stringify(bar));
                });
            }
        }
    });
});

//listen for connection
app.listen(3000, () => {
    console.log("Connected to server");
});

//get date to check against date in the DB. If they are different, reset going to 0.
function getDate(tzOffset){
    //getting UTC date for the server
    let thisDate = new Date();
    let thisOffset = thisDate.getTimezoneOffset();
    let utcTime = thisDate.getTime() + (thisOffset * 60) * 1000;
    //get date for the bar tzoffset is stored in seconds.
    return strftime('%F', new Date(utcTime + tzOffset))
}
//checkForBars(businesses, todayDate, offset, sendArray, i);
function checkForBars(businesses, todayDate, offset, sendArray, i){

    if(sendArray.length === businesses.length){
        //console.log(sendArray);
        return sendArray;
    }

    let barData = businesses[i];

    Bar.findOne({ _id: barData.id}, (err, barEntry) => {
        if(err) throw err;
        //if the bar exists, check to see if the date matches. If it does, return the bar as is,
        //if it doesn't, update the date to the current date and set the going field to 0
        if(barEntry !== null && barEntry.date !== todayDate){
                                
            barEntry.date = todayDate;
            barEntry.going = 0;

            barEntry.save((err) => {
                if(err) throw err;
                sendArray.push(barEntry);
                checkForBars(businesses, todayDate, offset, sendArray, i + 1);
            });

        } else if (barEntry === null){
            //create and save the new entry
            let newBar = new Bar({
                _id: barData.id,
                going: 0,
                url: barData.url,
                offset: offset * 1000,
                date: todayDate
            });

            newBar.save((err) => {
                if(err) throw err;
                sendArray.push(newBar);
                checkForBars(businesses, todayDate, offset, sendArray, i + 1);
            });

        } else {
            sendArray.push(barEntry);
            checkForBars(businesses, todayDate, offset, sendArray, i + 1);
        }
    });
}