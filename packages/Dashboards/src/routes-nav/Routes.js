import React from "react"
import { Switch, Route, Redirect } from "react-router-dom"
import Homepage from "../components/Homepage/Homepage"
import Dashboard from "../components/Dashboard/Dashboard"
import Entity from "../components/Entity/Entity"
import EditEntity from "../components/Entity/EntityDetails/EditEntity"
import Loan from "../components/Loan/Loan"
import Regulatory from "../components/Regulatory/Regulatory"
import MyRequest from "../components/MyRequest/MyRequest"

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
