const React = require('react');
const auth0 = require('auth0-js');
const axios = require('axios');

const Navbar = require('react-bootstrap').Navbar;
const Nav = require('react-bootstrap').Nav;
const NavItem = require('react-bootstrap').NavItem;
const NavDropdown = require('react-bootstrap').NavDropdown;
const MenuItem = require('react-bootstrap').MenuItem;

const isLoggedIn = require('../utils/authservice.js').isLoggedIn;
const login = require('../utils/authservice.js').login;
const logout = require('../utils/authservice.js').logout;
const getProfile = require('../utils/authservice').getProfile;
const getAccessToken = require('../utils/authservice').getAccessToken;

class Navi extends React.Component {
    constructor(){
        super();

        this.handleClick = this.handleClick.bind(this);
        this.testClick = this.testClick.bind(this);
        this.returnUser = this.returnUser.bind(this);

        this.state = { 
                        loggedIn: false,
                        userName: null 
                    };
    }
    handleClick(){
        if(!isLoggedIn()){
            login();
        } else {
            logout();
            this.setState({ loggedIn: false, userName: null }); 
        }
    }
    testClick(){
        //let token = getAccessToken(); 
        
    } 
    returnUser(){
        let profile = getProfile(getAccessToken(), (profile) => {
            localStorage.setItem('user_name', profile.nickname);
            this.setState({ userName: profile.nickname, loggedIn: true });
        });
    }
    render() {
        return(
        <Navbar className="main-nav">
            <Navbar.Header>
            <Navbar.Brand>
                <a className="brand">Where Ya Drinkin?</a>
            </Navbar.Brand>
            </Navbar.Header>
            <Nav className="pull-right">
            {(isLoggedIn() && (!this.state.userName)) ? ( this.returnUser() ) : null }
            <NavItem>{this.state.userName}</NavItem>
            {
                (isLoggedIn()) ? ( <NavItem onClick={this.handleClick}>Logout</NavItem> ) : ( <NavItem onClick={this.handleClick}>Login</NavItem> )
            } 
            </Nav>
        </Navbar> 
        ) 
    }
}

module.exports = Navi;