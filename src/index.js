import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import defaults from './graphql/defaults';

import Messages from './messages';

const client = new ApolloClient({
  uri: 'http://localhost:3100/graphql',
  clientState: {
    defaults,
  }
});

const App = () => (
    <ApolloProvider client={client}>
      <div>
        <h2>My first apollo app!</h2>
        <div>
          <Messages />
        </div>
      </div>
    </ApolloProvider>
)

ReactDOM.render(<App client={client}/>, document.getElementById('root'));
registerServiceWorker();
