import React from "react"
import { Switch, Route, Redirect } from "react-router-dom"
import Homepage from "../homepage/Homepage"
import Dashboard from "../Dashboard"
import Entity from "../Entity"
import EditEntity from "../EntityDetails/EditEntity"
import Loan from "../Loan"
import Regulatory from "../Regulatory"
import MyRequest from "../MyRequest"

/** Site-wide routes.
 * Visiting a non-existant route redirects to the homepage.
 */

function Routes() {
  return (
    <div className="pt-5">
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

        <Route exact path="/editentity">
          <EditEntity />
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
  )
}

export default Routes
