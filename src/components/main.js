var React = require('react');
var axios = require('axios');

var Grid = require('react-bootstrap').Grid;
var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;
var Button = require('react-bootstrap').Button;

var Results = require('./results');

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
                let results = [res.data.businesses];
                //console.log(results);
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
            <Row>
                <div className="form-group">    
                    <label>Enter Your Location</label>
                    <input type="text" className="form-control" id="location" />
                    <Button onClick={this.validateForm}>Go!</Button>
                    <div id="feedback" className="feedback"></div>
                </div>
            </Row>

            <Results results={this.state.data}/>

        </Grid>    
        )
    }
}

module.exports = Main;