import React from "react"
import { BrowserRouter, Switch, Route, Redirect  } from "react-router-dom"
import Homepage from "./components/homepage/Homepage"
import Dashboard from "./components/dashboard/Dashboard"
import Entity from "./components/entity/Entity"
import EntityDiscrepancy from "./components/entity/EntityDiscrepancy"
import EntitySelectTable from "./components/entity/entitySummary/EntitySelectTable"
import Loan from "./components/loan/Loan"
import LoanCreate from "./components/loan/LoanCreate"
import LoanDiscrepancy from "./components/loan/LoanDiscrepancy"
import LoanConfiguration from "./components/loan/LoanConfiguration"
import Regulatory from "./components/regulatory/Regulatory"
import MyRequest from "./components/myrequest/MyRequest"
import EntityConfiguration from "./components/entity/EntityConfiguration"
import EntityCreate from "./components/entity/EntityCreate"
import EntityEdit from "./components/entity/EntityEdit"
import EntityDelete from "./components/entity/EntityDelete"
import Report from './components/report/Report'
import ReportCreate from './components/report/ReportCreate'
import ReportEdit from './components/report/ReportEdit'
import HelixSelectTableSetUp from './components/HelixSelectTable/HelixSelectTableSetUp'
import Breadcrumbs from  "./components/utils/Breadcrumbs"
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
        <Breadcrumbs />
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

            <Route exact path="/entity/:id/discrepancy-report/summary" >
              <EntitySelectTable />
            </Route>

            <Route exact path="/loan">
              <Loan />
            </Route>

            <Route exact path="/loan/new" >
              <LoanCreate />
            </Route>

            <Route exact path="/loan/:id/discrepancy-report" >
              <LoanDiscrepancy />
            </Route>
            
            <Route exact path="/loan/configuration/:id" >
              <LoanConfiguration />
            </Route>
            
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

            <Route exact path="/selecttable">
              <HelixSelectTableSetUp />
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
