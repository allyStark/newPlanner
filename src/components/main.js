var React = require('react');

var Grid = require('react-bootstrap').Grid;
var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;
var Button = require('react-bootstrap').Button;

var Results = require('./results');

class Main extends React.Component {
    constructor() {
        super();
        
    }
    validateForm() {
        let content = document.getElementById('location').value;

        if(content == ""){
            document.getElementById('feedback').innerHTML = "Enter a location wise guy";
        } else {
            document.getElementById('feedback').innerHTML = "";
        }
        console.log(content);
    }
    render() {
        return(
        <Grid>
            <Row>
                <div className="form-group">    
                    <label>Enter Your Location</label>
                    <input type="text" className="form-control" id="location" />
                    <Button onClick={this.validateForm}>Go!</Button>
                    <div id="feedback" className="feedback"></div>
                </div>
            </Row>

            <Results />

        </Grid>    
        )
    }
}

module.exports = Main;