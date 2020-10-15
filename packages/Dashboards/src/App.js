import React from "react"
import { BrowserRouter, Switch, Route, Redirect  } from "react-router-dom"
import Homepage from "./components/Homepage/Homepage"
import Dashboard from "./components/Dashboard/Dashboard"
import Entity from "./components/Entity/Entity"
import Discrepancy from "./components/Entity/EntityDiscrepancy"
import Loan from "./components/Loan/Loan"
import Regulatory from "./components/Regulatory/Regulatory"
import MyRequest from "./components/MyRequest/MyRequest"
import EntityConfiguration from "./components/Entity/EntityConfiguration"
import EntityCreate from "./components/Entity/EntityCreate"
import EntityEdit from "./components/Entity/EntityEdit"
import EntityDelete from "./components/Entity/EntityDelete"

function App(history) {
  return (
    <div className="pt-5">
      <BrowserRouter>
        <div>
          <Switch>
            <Route path="/home">
              <Homepage />
            </Route>

            <Route exact path="/dashboard">
              <Dashboard />
            </Route>

            <Route exact path="/entity">
              <Entity />
            </Route>

            <Route exact path="/entity/configuration">
              <EntityConfiguration />
            </Route>

            <Route exact path="/entity/new">
              <EntityCreate />
            </Route>

            <Route exact path="/entity/edit/:id">
              <EntityEdit />
            </Route>

            <Route exact path="/entity/delete/:id">
              <EntityDelete />
            </Route>

            <Route exact path="/entity/:id/discrepancy-report">
              <Discrepancy />
            </Route>

            <Route exact path="/loan">
              <Loan />
            </Route>

            <Route exact path="/regulatory">
              <Regulatory />
            </Route>

            <Route exact path="/myrequest">
              <MyRequest />
            </Route>

            <Redirect to="/home" />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
