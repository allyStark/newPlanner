var React = require('react');

var Navbar = require('react-bootstrap').Navbar;
var Nav = require('react-bootstrap').Nav;
var NavItem = require('react-bootstrap').NavItem;
var NavDropdown = require('react-bootstrap').NavDropdown;
var MenuItem = require('react-bootstrap').MenuItem;

class Navi extends React.Component {
    render() {
        return(
        <Navbar className="main-nav">
            <Navbar.Header>
            <Navbar.Brand>
                <a href="#">Where Ya Drinkin?</a>
            </Navbar.Brand>
            </Navbar.Header>
            <Nav className="pull-right">
            <NavItem eventKey={1} href="#">Login</NavItem>
            {/* <NavItem eventKey={2} href="#">Logout</NavItem> */}
            </Nav>
        </Navbar>
        )
    }
}

module.exports = Navi;