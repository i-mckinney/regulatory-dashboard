import React from "react"
import { BrowserRouter } from "react-router-dom"
import Routes from "./routes-nav/Routes"

function App(history) {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes/>
      </div>
    </BrowserRouter>
  )
}

export default App
