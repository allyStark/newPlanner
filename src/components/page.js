var React = require('react');

var Navi = require('./navi');
var Main = require('./main');

class Page extends React.Component{
    render() {
        return (
            <div>
            <Navi />
            <Main />
            </div>
        )
    }
}

module.exports = Page;