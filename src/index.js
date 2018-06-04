import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter, Switch, Route } from 'react-router';


import App from './App';

const client = new ApolloClient({
  uri: 'http://localhost:3100/graphql',
  clientState: {
    defaults,
  }
});

ReactDOM.render(
  <ApolloProvider client={ client }>
    <BrowserRouter>
      <BaseLayout>
        <Switch>
          <Route exact path="/" component={App} />
          <Route path="/home" component={Home} />
          <Route path="/message/:messageId" component={Message} />
          <Route path="/compose" component={Compose} />
          <Route path="/user/:userId" component={User} />
        </Switch>
      </BaseLayout>
    </BrowserRouter>
  </ApolloProvider>
  <App client={client}/>, 
  document.getElementById('root'));
registerServiceWorker();
