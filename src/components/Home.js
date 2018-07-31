import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Messages from './Messages';
import { Container } from 'semantic-ui-react';

export default class Home extends Component {
  render() {
    const { isAuthenticated } = this.props.auth;

    if (isAuthenticated()) {
      return (
        <div>
          <Container fluid>
            <Messages />
          </Container>
        </div>
      );
    } else {
      return (
        <Redirect to="/" />
      )
    }
    
  }
} 
