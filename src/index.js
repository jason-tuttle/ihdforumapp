import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
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

console.log(`Running in ${process.env.NODE_ENV} mode...`);

let uri;
if (process.env.NODE_ENV === 'development') {
  uri = 'https://ihd-forum-server.herokuapp.com/graphql'
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

const baseUrl = process.env.PUBLIC_URL ? process.env.PUBLIC_URL : '';

ReactDOM.render(
  <ApolloProvider client={ client }>
    <Router basename={baseUrl} >
      <BaseLayout auth={auth} >
        <Switch>
          <Route exact path={baseUrl + "/"} render={props => <App auth={auth} {...props}/>} />
          <Route path={baseUrl + "/home"} render={props => <Home auth={auth} {...props} />} />
          <Route path={baseUrl + "/callback"} render={props => {
            handleAuthentication(props);
            return <Callback {...props} />
          }} />} />
          <Route path={baseUrl + "/message/:messageId"} render={props => <Message auth={auth} baseUrl={baseUrl} {...props} /> } />
          <Route path={baseUrl + "/compose"} render={props => <Compose history={history} {...props} /> } />
          <Route path={baseUrl + "/user/:userId"} component={User} />
        </Switch>
      </BaseLayout>
    </Router>
  </ApolloProvider>,
  document.getElementById('root'));
registerServiceWorker();
