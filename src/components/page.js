const React = require('react');

const Navi = require('./navi');
const Main = require('./main');

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