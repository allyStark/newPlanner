var React = require('react');

var Navbar = require('react-bootstrap').Navbar;
var Nav = require('react-bootstrap').Nav;
var NavItem = require('react-bootstrap').NavItem;
var NavDropdown = require('react-bootstrap').NavDropdown;
var MenuItem = require('react-bootstrap').MenuItem;

const isLoggedIn = require('../utils/authservice.js').isLoggedIn;
const login = require('../utils/authservice.js').login;
const logout = require('../utils/authservice.js').logout;

class Navi extends React.Component {
    constructor(){
        super();

        this.handleClick = this.handleClick.bind(this);

        this.state = { loggedIn: false };
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
            {/* <NavItem eventKey={1} href="#">Login</NavItem>
             <NavItem eventKey={2} href="#">Logout</NavItem>  */}  
            </Nav>
        </Navbar> 
        ) 
    }
}

module.exports = Navi;