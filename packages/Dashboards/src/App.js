import React from "react"
import { BrowserRouter, Switch, Route, Redirect  } from "react-router-dom"
import Homepage from "./components/homepage/Homepage"
import Dashboard from "./components/dashboard/Dashboard"
import Entity from "./components/entity/Entity"
import EntityDiscrepancy from "./components/entity/EntityDiscrepancy"
import Loan from "./components/loan/Loan"
import Regulatory from "./components/regulatory/Regulatory"
import MyRequest from "./components/myrequest/MyRequest"
import EntityConfiguration from "./components/entity/EntityConfiguration"
import EntityCreate from "./components/entity/EntityCreate"
import EntityEdit from "./components/entity/EntityEdit"
import EntityDelete from "./components/entity/EntityDelete"
import Report from './components/report/Report'
import ReportCreate from './components/report/ReportCreate'
import ReportEdit from './components/report/ReportEdit'
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";

const generateClassName = createGenerateClassName({
  productionPrefix: "dashbored-",
  seed:"dash"
});

function App(history) {
  return (
    <StylesProvider generateClassName={generateClassName}>
    <div className="pt-5">
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path="/homepage">
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
              <EntityDiscrepancy />
            </Route>

            <Route exact path="/loan">
              <Loan />
            </Route>

            <Route exact path="/loan/new" />

            <Route exact path="/loan/edit/:id" />

            <Route exact path="/regulatory">
              <Regulatory />
            </Route>

            <Route exact path="/myrequest">
              <MyRequest />
            </Route>

            <Route exact path="/report">
              <Report />
            </Route>

            <Route exact path="/report/new">
              <ReportCreate />
            </Route>

            <Route exact path="/report/edit/:id">
              <ReportEdit />
            </Route>

            <Redirect to="/" />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
    </StylesProvider>
  )
}

export default App
