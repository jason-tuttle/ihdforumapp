import auth0 from 'auth0-js';

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: 'jason-tuttle.auth0.com',
    clientId: Slx5o2xlTxaEhXx0w0ai0PIeP1Dq0gLc',
    redirectUri: 'http://localhost:3000/home',
    audience: 'https://jason-tuttle.auth0.com/userinfo',
    responseType: 'token id_token',
    scope: 'openid'
  });
  
  login() {
    this.auth0.authorize();
  }
}