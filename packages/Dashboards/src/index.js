import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'react-app-polyfill/ie11';
import { ApolloProvider, ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';

const link = createHttpLink({
  uri: 'http://localhost:4000/graphql',
  credentials: "include"
});

const gqlClient = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
  link
});

const ID = "Dashboard-container"

// render micro frontend function
window.renderDashboard = (containerId) => {
  ReactDOM.render(
    <ApolloProvider client={gqlClient}>
      <App />
    </ApolloProvider>,
    document.getElementById(containerId)
  );
  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: https://bit.ly/CRA-PWA
  serviceWorker.unregister();
};

//unmount function
window.unmountDashboard = containerId => {
  ReactDOM.unmountComponentAtNode(document.getElementById(containerId));
};

// Mount to root if it is not a micro frontend
if (!document.getElementById(ID)) {
  ReactDOM.render(<App />, document.getElementById('notRoot'));
}



