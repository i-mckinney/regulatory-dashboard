import React from 'react';
import './App.css';
import LoginPage from './LoginPage/LoginPage';

import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';


const link = createHttpLink({
  uri: 'http://localhost:4000/graphql',
  credentials: 'includes'
});

const gqlClient = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
  link
});



function App() {
  return (
    <ApolloProvider client={gqlClient}>
      <div className='App'>
        <LoginPage />
      </div>
    </ApolloProvider>
  );
}

export default App;
