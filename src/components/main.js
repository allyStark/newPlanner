const React = require('react');
const axios = require('axios');

const Grid = require('react-bootstrap').Grid;
const Row = require('react-bootstrap').Row;
const Col = require('react-bootstrap').Col;
const Button = require('react-bootstrap').Button;

const Results = require('./results');

class Main extends React.Component {
    constructor() {
        super();

        this.state = { data: "a" };
        this.validateForm = this.validateForm.bind(this);
    }
    validateForm() {
        let content = document.getElementById('location').value;

        if(content == ""){
            document.getElementById('feedback').innerHTML = "Enter a location wise guy";
        } else {
            document.getElementById('feedback').innerHTML = "";
            axios.post('/api/places', { location: content }).then((res) => {
   
                let results = [res.data];
                this.setState({ data: results });
                //TODO error handling
            }).catch((err) => {
                console.log(err);
            });
        }
    }
    render() {
        return(
        <Grid>
            <div className="picture">
            <Row className="instructions">
                <br/>
                <p>- Create an account and login.</p>
                <p>- Search for bars in your area and see who is going to be there!</p>
                <p>- If you live in a big city with lots of bars, try to include the street name or neighbourhood.</p>
                <p>- Press the giant 'Going?' button to declare your intentions to go to the bar!</p>
                <p>- Hit the giant Yelp button to get more info about the bar you are interested in!</p>
                <p>- When the date changes at the bars local time, the people going will reset to 0.</p>
                <p>- Drink responsibly! Or don't, that's up to you.</p>
                <br/>
            </Row>
            <Row>
                <div className="form-group">    
                    <label>Enter Your Location</label>
                    <input type="text" className="form-control" id="location" />
                    <Button block onClick={this.validateForm}>Find Me Some Bars!!!</Button>
                    <div id="feedback" className="feedback"></div>
                </div>
            </Row>
            </div>
            <Results results={this.state.data}/>

        </Grid>    
        )
    }
}
module.exports = Main;