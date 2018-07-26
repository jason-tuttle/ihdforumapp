import React, { Component } from 'react';
import { ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';

export default class LoginQuery extends Component {
  state = { loggedIn: false };
  
  onLogin = status => this.setState(() => ({ loggedIn: status }));
  
  render() {
    return (
      <p>
        This is the login screen.
      </p>
    )
  }
}