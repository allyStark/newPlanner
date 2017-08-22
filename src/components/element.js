var React = require('react');
var axios = require('axios');

var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;
var Button = require('react-bootstrap').Button;

const isLoggedIn = require('../utils/authservice').isLoggedIn;
const login = require('../utils/authservice').login;
const getAccessToken = require('../utils/authservice').getAccessToken;

class Element extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            name : this.props.element.name,
             _id : this.props.element._id, 
            going : this.props.element.going,
            url : this.props.element.url
            };
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        if(!isLoggedIn()){
            login();
        } else {
            let token = getAccessToken();
            axios.defaults.headers.common['Authorization'] = "Bearer " + token;
            axios.post('/api/going', {
                barId: this.state._id
            }).then((res) => {
                this.setState({
                    name : res.data.name,
                    _id : res.data._id,
                    going : res.data.going,
                    url : res.data.url
                }); 

            }).catch((err) => {
                console.log(err);
            });
        }    
    }
    render() {
        console.log(this.state);
        return( 
            <Row className="results-row" key={this.state._id + "elementRow"}>
                <Col md={3} className="results-name text-center">{this.state.name}</Col>           
                { 
                    ( isLoggedIn() ? <Col md={3}><Button bsSize="large" className="results-going" id={this.state.name} onClick={this.handleClick}>Going?</Button></Col> : <Col md={7}>Login to attend</Col> )
                }
                {
                    ( isLoggedIn() ? <Col className="people-going text-center" id={this.state._id + "peoplegoing"} md={4}>{this.state.going}</Col> : <div /> )
                }
                <Col md={2}><a href={this.state.url}><Button bsSize="large"><img className="result-yelp" src="./images/yelplogo.png"/></Button></a></Col>
            </Row>
        )
    }
}
//Hi
module.exports = Element;