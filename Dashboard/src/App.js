import React from "react"
import { BrowserRouter } from "react-router-dom"
import Navigation from "./routes-nav/Navigation"
import Routes from "./routes-nav/Routes"
import helixLogo from "./helixLogo.jpg"

function App(history) {
  return (
    <BrowserRouter>
      <div>
        <img src={helixLogo} className="mt-2 mb-2" alt="helixLogo" />
      </div>
      <div className="App">
        <Navigation />
        <Routes />
      </div>
    </BrowserRouter>
  )
}

export default App
