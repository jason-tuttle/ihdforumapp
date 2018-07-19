import React, { Component } from 'react';

class App extends Component {
  goTo = (route) => { this.props.history.replace(`/${route}`); }
  login = () => { this.props.auth.login(); }
  logout = () => { this.props.auth.logout(); }

  render() {
    console.log(this.props);
    const { isAuthenticated } = this.props.auth;
    return (
      <div>
        <h1>Auth0 - React</h1>
        {
          !isAuthenticated() && (
            <button onClick={this.login}>Log In</button>
          )
        }
        { isAuthenticated() && (
            <button onClick={this.logout}>Log Out</button>
          )
        }
      </div>
    )
  }
}

export default App;
