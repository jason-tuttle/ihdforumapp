import auth0 from 'auth0-js';
import history from '../history';

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: 'jason-tuttle.auth0.com',
    clientID: process.env.REACT_APP_CLIENT_ID,
    redirectUri: process.env.NODE_ENV === 'development' ? 'http://localhost:3000/callback' : 'https://jason-tuttle.github.io/ihdforumapp/callback',
    audience: 'https://jason-tuttle.auth0.com/userinfo',
    responseType: 'token id_token',
    scope: 'openid profile'
  });

  handleAuthentication = () => {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
      } else if (err) {
        console.warn(err);
      }
    });
  }

  setSession = (authResult) => {
    // set expiration time for the access token
    let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    this.auth0.client.userInfo(authResult.accessToken, (err, user) => {
      if (err) {
        console.warn(err);
      } else {
        localStorage.setItem('user_info', JSON.stringify(user));
      }
    });

    // navigate to home route
    history.push(process.env.NODE_ENV === 'development' ? '/home' : '/ihdforumapp/home');
  }

  logout = () => {
    // clear access token and id token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('user_info');
    // navigate to home route
    history.push(process.env.NODE_ENV === 'development' ? '/' : '/ihdforumapp/');
  }

  login = () => {
    this.auth0.authorize();
  }

  isAuthenticated = () => {
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }
}
