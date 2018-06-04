import React from 'react';
import { ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';

class LoginQuery extends Component {
  state = { loggedIn: false };
  
  onLogin = status => this.setState(() => ({ loggedIn: status }));
  
  render() {
    
  }
}