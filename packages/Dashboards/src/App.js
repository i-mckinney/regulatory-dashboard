import React from "react"
import { BrowserRouter, Switch, Route, Redirect  } from "react-router-dom"
import Homepage from "./components/homepage/Homepage"
import Dashboard from "./components/dashboard/Dashboard"
import Entity from "./components/entity/Entity"
import Discrepancy from "./components/entity/EntityDiscrepancy"
import Loan from "./components/loan/Loan"
import Regulatory from "./components/regulatory/Regulatory"
import MyRequest from "./components/myrequest/MyRequest"
import EntityConfiguration from "./components/entity/EntityConfiguration"
import EntityCreate from "./components/entity/EntityCreate"
import EntityEdit from "./components/entity/EntityEdit"
import EntityDelete from "./components/entity/EntityDelete"

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

            <Route exact path="/entity/:id/discrepancy">
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

            <Redirect to="/" />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
