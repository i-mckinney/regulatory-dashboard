import React from "react"
import { BrowserRouter } from "react-router-dom"
import Routes from "./routes-nav/Routes"
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';

const generateClassName = createGenerateClassName({
  productionPrefix: 'dashapp-',
});

function App(history) {
  return (
    <StylesProvider generateClassName={generateClassName}>
      <BrowserRouter>
        <div className="App">
          <Routes />
        </div>
      </BrowserRouter>
    </StylesProvider>

  )
}

export default App
