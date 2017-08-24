const decode = require('jwt-decode');
const browserHistory = require('react-router').browserHistory;
const auth0 = require('auth0-js');
const ID_TOKEN_KEY = 'id_token';
const ACCESS_TOKEN_KEY = 'access_token';

const CLIENT_ID = 'MtW7JNeO8iQ2elHzUOsavLJlFKD66Koo';
const CLIENT_DOMAIN = 'allyauth.auth0.com';
const REDIRECT = 'http://localhost:3000/callback';
const AUDIENCE = 'http://goingtobar.com';

const auth = new auth0.WebAuth({
  clientID: CLIENT_ID, 
  domain: CLIENT_DOMAIN,
  scope: 'openid profile'
});

module.exports.login = function() {
  auth.authorize({
    responseType: 'token id_token',
    redirectUri: REDIRECT,
    audience: AUDIENCE,
  });
}

module.exports.logout = function() {
  clearIdToken();
  clearAccessToken();
  localStorage.removeItem('user_name');
  browserHistory.push('/');
}

module.exports.requireAuth = function(nextState, replace) {
  if (!isLoggedIn()) {
    replace({pathname: '/'});
  }
}

function getIdToken() {
  return localStorage.getItem(ID_TOKEN_KEY);
}

module.exports.getAccessToken = function() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

function clearIdToken() {
  localStorage.removeItem(ID_TOKEN_KEY);
}

function clearAccessToken() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
}

// Helper function that will allow us to extract the access_token and id_token
function getParameterByName(name) {
  let match = RegExp('[#&]' + name + '=([^&]*)').exec(window.location.hash);
  return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

// Get and store access_token in local storage
module.exports.setAccessToken = function() {
  let accessToken = getParameterByName('access_token');
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
}

// Get and store id_token in local storage
module.exports.setIdToken = function() {
  let idToken = getParameterByName('id_token');
  localStorage.setItem(ID_TOKEN_KEY, idToken);
}

module.exports.isLoggedIn = function() {
  const idToken = getIdToken();
  return !!idToken && !isTokenExpired(idToken);
}

function getTokenExpirationDate(encodedToken) {
  const token = decode(encodedToken);
  if (!token.exp) { return null; }

  const date = new Date(0);
  date.setUTCSeconds(token.exp);

  return date;
}

function isTokenExpired(token) {
  const expirationDate = getTokenExpirationDate(token); 
  return expirationDate < new Date();
}

module.exports.getProfile = function(accessToken, callback){
  auth.client.userInfo(accessToken, (err, profile) => {
    if(profile){
      callback(profile);
    }
    if(err) throw err;
  })
}