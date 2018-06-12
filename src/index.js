import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import ApolloClient from 'apollo-boost';
import { ApolloLink, concat } from 'apollo-link';
import { ApolloProvider } from 'react-apollo';
import { createHttpLink, HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { Router, Switch, Route } from 'react-router-dom';
import Auth from './Auth/auth';
import history from './history';

// COMPONENTS
import App from './components/App';
import BaseLayout from './components/BaseLayout';
import Home from './components/Home';
import Message from './components/Message';
import Compose from './components/Compose';
import User from './components/User';
import Callback from './components/Callback';

const link = {
  uri: 'http://localhost:3100/graphql'
};
const httpLink = createHttpLink({
  uri: 'http://localhost:3100/graphql',
});


const client = new ApolloClient({
  uri: 'https://ihd-forum-server.herokuapp.com/graphql',
  cache: new InMemoryCache(),
});

const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
}

ReactDOM.render(
  <ApolloProvider client={ client }>
    <Router history={history}>
      <BaseLayout>
        <Switch>
          <Route exact path="/" render={props => <App auth={auth} {...props}/>} />
          <Route path="/home" render={props => <Home auth={auth} {...props} />} />
          <Route path="/callback" render={props => {
            handleAuthentication(props);
            return <Callback {...props} />
          }} />} />
          <Route path="/message/:messageId" render={props => <Message {...props} /> } />
          <Route path="/compose" component={Compose} />
          <Route path="/user/:userId" component={User} />
        </Switch>
      </BaseLayout>
    </Router>
  </ApolloProvider>,
  document.getElementById('root'));
registerServiceWorker();
