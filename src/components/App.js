import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { ApolloProvider } from 'react-apollo';
import { Router } from 'react-router';

// COMPONENTS
import Auth from './Auth/auth';
import Home from './Home';

class App extends Component {
  render() {
    const { client } = this.props;
    return (
      <ApolloProvider client={ client }>
        <Router>
          <Home />
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
