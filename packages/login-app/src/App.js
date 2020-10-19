import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import LoginPage from "./LoginPage/LoginPage";
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";

const generateClassName = createGenerateClassName({
  productionPrefix: "loginApp-",
  seed:"login"
});

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path="/">
          <StylesProvider generateClassName={generateClassName}>
            <LoginPage />
          </StylesProvider>
        </Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
