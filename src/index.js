import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import defaults from './graphql/defaults';

import App from './App';

const client = new ApolloClient({
  uri: 'http://localhost:3100/graphql',
  clientState: {
    defaults,
  }
});

ReactDOM.render(<App client={client}/>, document.getElementById('root'));
registerServiceWorker();
