const React = require('react');
const ReactDOM = require('react-dom');
const Navi = require('./components/navi');
const Main = require('./components/main');
const Callback = require('./components/callback');
const Router = require('react-router').Router;
const Route = require('react-router').Route;
const browserHistory = require('react-router').browserHistory;

class Page extends React.Component{
    render() {
        return (
            <div>
            <Navi />
            <Router history={browserHistory}>
                <Route path="/" component={Main} />
                <Route path="/callback" component={Callback} />
            </Router>  
            </div>
        )
    }
} 

ReactDOM.render(<Page />,
 document.getElementById('main')); 