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

const httpLink = createHttpLink({
  uri: 'http://localhost:3100/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('access_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    }
  }
});

const client = new ApolloClient({
  link: concat(authLink, httpLink),
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
          <Route exact path="/" render={props => <App client={client} auth={auth} {...props}/>} />
          <Route path="/home" render={props => <Home client={client} auth={auth} {...props} />} />
          <Route path="/callback" render={props => {
            handleAuthentication(props);
            return <Callback {...props} />
          }} />} />
          <Route path="/message/:messageId" render={props => <Message client={client} {...props} /> } />
          <Route path="/compose" component={Compose} />
          <Route path="/user/:userId" component={User} />
        </Switch>
      </BaseLayout>
    </Router>
  </ApolloProvider>,
  document.getElementById('root'));
registerServiceWorker();
