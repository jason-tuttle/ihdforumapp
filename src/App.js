import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { ApolloProvider } from 'react-apollo';
// COMPONENTS
import Messages from './messages';




class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div>
          <h2>My first apollo app!</h2>
          <div>
            <Messages />
          </div>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
