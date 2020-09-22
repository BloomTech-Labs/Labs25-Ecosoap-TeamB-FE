import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  useHistory,
  Switch,
} from 'react-router-dom';
import { Security, LoginCallback, SecureRoute } from '@okta/okta-react';

import 'antd/dist/antd.less';

// Apollo Client Imports
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { NotFoundPage } from './components/pages/NotFound';
import { ExampleListPage } from './components/pages/ExampleList';
import { LoginPage } from './components/pages/Login';
import { HomePage } from './components/pages/Home';
import { DataRecordsPage } from './components/pages/DataRecords';
import { DataTypesPage } from './components/pages/DataTypes';
import { config } from './utils/oktaConfig';
import { LoadingComponent } from './components/common';

require('dotenv').config();

// API address for Apollo
const httpLink = createHttpLink({
  uri: 'http://35.208.9.187:9092/web-api-2',
});
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <Router>
    <React.StrictMode>
      <ApolloProvider client={client}>
        <App client={client} />
      </ApolloProvider>
    </React.StrictMode>
  </Router>,
  document.getElementById('root')
);

function App() {
  // The reason to declare App this way is so that we can use any helper functions we'd need for business logic, in our case auth.
  // React Router has a nifty useHistory hook we can use at this level to ensure we have security around our routes.
  const history = useHistory();

  const authHandler = () => {
    // We pass this to our <Security /> component that wraps our routes.
    // It'll automatically check if userToken is available and push back to login if not :)
    history.push('/login');
  };

  return (
    <Security {...config} onAuthRequired={authHandler}>
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/implicit/callback" component={LoginCallback} />
        {/* any of the routes you need secured should be registered as SecureRoutes */}
        <SecureRoute
          path="/"
          exact
          component={() => (
            <ExampleListPage LoadingComponent={LoadingComponent} />
          )}
        />
        <SecureRoute path="/datarecords" component={DataRecordsPage} />
        <SecureRoute path="/datatypes" component={DataTypesPage} />
        <SecureRoute path="/createuser" component={HomePage} />

        <Route component={NotFoundPage} />
      </Switch>
    </Security>
  );
}
