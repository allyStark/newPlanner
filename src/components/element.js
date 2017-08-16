var React = require('react');
var axios = require('axios');

var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;
var Button = require('react-bootstrap').Button;

class Element extends React.Component{
    constructor(props){
        super(props)

        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        let lat = this.props.element.coordinates.latitude;
        let lon = this.props.element.coordinates.longitude;

        axios.post('/api/going', {
            lat: lat,
            lon: lon
            }).then((res) => {
                console.log(res);
                //TODO replace number going. State? 
            }).catch((err) => {
                console.log(err);
            });

        // console.log(this.props.element);
        // console.log(test);
        
    }
    render() {
        //console.log(this.props.element);
        return(
            <Row className="results-row">
                <Col md={3} className="results-name text-center">{this.props.element.name}</Col>           
                <Col md={3}><Button bsSize="large" className="results-going" id={this.props.element.name} onClick={this.handleClick}>Going?</Button></Col>
                <Col className="people-going text-center" id={this.props.element.name + "peoplegoing"} md={4}>There are 0 people going here tonight.</Col>
                <Col md={2}><a href={this.props.element.url}><Button bsSize="large"><img className="result-yelp" src="./images/yelplogo.png"/></Button></a></Col>
            </Row>
        )
    }
}

module.exports = Element;