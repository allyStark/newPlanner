const React = require('react');
const setIdToken = require('../utils/authservice').setIdToken;
const setAccessToken = require('../utils/authservice').setAccessToken;

class Callback extends React.Component {

  constructor() {
    super()
  }

  componentDidMount() {
    setAccessToken();
    setIdToken();
    window.location.href = "/";
  }

  render() {
    return null;
  }
}

module.exports = Callback; 