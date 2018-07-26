import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { createHttpLink } from 'apollo-link-http';
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

let uri;
if (process.env.NODE_ENV === 'development') {
  uri = 'http://localhost:3100/graphql'
} else {
  uri = 'https://ihd-forum-server.herokuapp.com/graphql'
}

const httpLink = createHttpLink({
  uri,
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    }
  }
});



const client = new ApolloClient({
  uri,
  link: authLink.concat(httpLink),
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
      <BaseLayout auth={auth}>
        <Switch>
          <Route exact path="/" render={props => <App auth={auth} {...props}/>} />
          <Route path="/home" render={props => <Home auth={auth} {...props} />} />
          <Route path="/callback" render={props => {
            handleAuthentication(props);
            return <Callback {...props} />
          }} />} />
          <Route path="/message/:messageId" render={props => <Message auth={auth} {...props} /> } />
          <Route path="/compose" render={props => <Compose {...props} /> } />
          <Route path="/user/:userId" component={User} />
        </Switch>
      </BaseLayout>
    </Router>
  </ApolloProvider>,
  document.getElementById('root'));
registerServiceWorker();
