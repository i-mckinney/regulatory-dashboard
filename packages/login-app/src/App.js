import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import LoginPage from "./LoginPage/LoginPage";
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';


const generateClassName = createGenerateClassName({
  productionPrefix: "loginApp-",
  seed:"login"
});

//Setting up GQL Connection
const link = createHttpLink({
  uri: 'http://localhost:4000/graphql',
  //sends cookie
  credentials: "include"
});

const gqlClient = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
  link
});



function App() {
  return (
    <ApolloProvider client={gqlClient}>
    <div className="App">
      <BrowserRouter>
        <Route exact path="/">
          <StylesProvider generateClassName={generateClassName}>
            <LoginPage />
          </StylesProvider>
        </Route>
      </BrowserRouter>
    </div>
    </ApolloProvider>
  );
}

export default App;
