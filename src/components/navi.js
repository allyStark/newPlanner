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

        this.state = { loggedIn: false,
                       userName: null 
                    };
    }
    handleClick(){
        if(!isLoggedIn()){
            login();
            this.setState({ loggedIn: true });
        } else {
            logout();
            this.setState({ loggedIn: false }); 
        }
    }
    testClick(){
        let token = getAccessToken();
        // axios.defaults.headers.common['Authorization'] = token;
        // axios.get('https://allyauth.auth0.com/api/v2/users/' + token + '?include_fields=true', (profile) => {
        //     console.log("Hi " + profile);
        // });
        if(!token){
            throw new Error('No access token was found');
        }
        let profile = getProfile(token);
        console.log(profile);
        
    }
    returnUser(){
        return;
    }
    render() {
        return(
        <Navbar className="main-nav">
            <Navbar.Header>
            <Navbar.Brand>
                <a href="#">Where Ya Drinkin?</a>
            </Navbar.Brand>
            </Navbar.Header>
            <Nav className="pull-right">
            {
                (isLoggedIn()) ? ( <NavItem onClick={this.handleClick}>Logout</NavItem> ) : ( <NavItem onClick={this.handleClick}>Login</NavItem> )
            } 
            {
                (isLoggedIn()) ? ( <NavItem onClick={this.testClick}>Test</NavItem> ) : <NavItem />
            } 
            {
                (isLoggedIn()) ? ( <NavItem>{this.returnUser}</ NavItem> ) : <NavItem />
            }
            </Nav>
        </Navbar> 
        ) 
    }
}

module.exports = Navi;