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

        axios.post('/api/going', {
            lat: this.props.element.coordinates.latitude,
            lon: this.props.element.coordinates.longitude,
            barId: this.props.element.id
        }).then((res) => {
            console.log(res);
            //TODO replace number going. State? 
        }).catch((err) => {
            console.log(err);
        });    
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