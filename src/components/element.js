const React = require('react');
const axios = require('axios');

const Row = require('react-bootstrap').Row;
const Col = require('react-bootstrap').Col;
const Button = require('react-bootstrap').Button;

const isLoggedIn = require('../utils/authservice').isLoggedIn;
const login = require('../utils/authservice').login;
const getAccessToken = require('../utils/authservice').getAccessToken;

class Element extends React.Component{
    constructor(props){
        super(props)

        let currentUser = localStorage.getItem('user_name') + "  ";
        let thisButton = "Going?";

        if(this.props.element.attending.indexOf(currentUser) !== -1){
            thisButton = "Cancel";
        }

        this.state = {
            name : this.props.element.name,
             _id : this.props.element._id, 
            going : this.props.element.going,
            url : this.props.element.url,
            attending: this.props.element.attending,
            button: thisButton
            };
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        if(!isLoggedIn()){
            login();
        } else {
            let token = getAccessToken();
            let attendee = localStorage.getItem('user_name');
        
            axios.defaults.headers.common['Authorization'] = "Bearer " + token;
            axios.post('/api/going', {
                barId: this.state._id,
                attendee: attendee + "  "
            }).then((res) => {
                let button = "";
                if(this.state.button == "Going?"){
                    button = "Cancel";
                } else {
                    button = "Going?";
                }
                this.setState({
                    name : res.data.name,
                    _id : res.data._id,
                    going : res.data.going,
                    url : res.data.url,
                    attending: res.data.attending,
                    button: button
                }); 

            }).catch((err) => {
                console.log(err);
            });
        }    
    }
    render() {
        return( 
            <div>
            <Row className="results-row" key={this.state._id + "elementRow"}>
                <Col md={3} className="results-name text-center">{this.state.name}</Col>           
                { 
                    ( isLoggedIn() ? <Col xs={3} className="button-col"><Button bsSize="large" className="results-going" id={this.state.name} onClick={this.handleClick}>{this.state.button}</Button></Col> : <div><Col xs={2}/><Col className="login-message" xs={2}>Login to attend</Col><Col xs={3}/></div> )
                }
                {
                    ( isLoggedIn() ? <Col className="people-going text-center" id={this.state._id + "peoplegoing"} xs={4}>{this.state.going}</Col> : <div /> )
                }
                <Col xs={2} className="button-col"><a href={this.state.url}><Button bsSize="large"><img className="result-yelp" src="./images/yelplogo.png"/></Button></a></Col>
            </Row>
            <Row className="attending-row">
                <Col md={12} className="attending-col">
                    {this.state.attending}
                </Col>
            </Row>
            </div>
        )
    }
}
module.exports = Element;