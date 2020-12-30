import React from "react"
import { BrowserRouter, Switch, Route, Redirect  } from "react-router-dom"
import Entity from "./components/entity/Entity"
import EntityDiscrepancy from "./components/entity/EntityDiscrepancy"
import SummarySelectTable from "./components/summaryPage/SummarySelectTable"
import Loan from "./components/loan/Loan"
import LoanCreateSelectEntity from "./components/loan/LoanCreateSelectEntity"
import LoanCreateSelectLoan from "./components/loan/LoanCreateSelectLoan"
import LoanDiscrepancy from "./components/loan/LoanDiscrepancy"
import LoanConfiguration from "./components/loan/LoanConfiguration"
import GenerateReport from "./components/generateReport/GenerateReport"
import MyRequest from "./components/myrequest/MyRequest"
import EntityConfiguration from "./components/entity/EntityConfiguration"
import EntityCreate from "./components/entity/EntityCreate"
import EntityEdit from "./components/entity/EntityEdit"
import EntityDelete from "./components/entity/EntityDelete"
import Report from './components/report/Report'
import ReportTemplatePage from './components/report-template/ReportTemplatePage'
import ReportTemplateCreate from './components/report-template/ReportTemplateCreate'
import HelixSelectTableSetUp from './components/HelixSelectTable/HelixSelectTableSetUp'
import Breadcrumbs from  "./components/utils/Breadcrumbs"
import HelixTableKeysRight from  "./components/utils/helix-table-keys/HelixTableKeysRight"
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles"

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
              <HelixTableKeysRight />
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
              <SummarySelectTable summaryType={"entitiy"} />
            </Route>

            <Route exact path="/loan">
              <Loan />
            </Route>

            <Route exact path="/loan/:id/discrepancy-report/summary">
              <SummarySelectTable summaryType={"loan"} />
            </Route>

            <Route exact path="/loan/new/selectentity" >
              <LoanCreateSelectEntity />
            </Route>

            <Route exact path="/loan/new/selectloan" >
              <LoanCreateSelectLoan />
            </Route>

            <Route exact path="/loan/:id/discrepancy-report" >
              <LoanDiscrepancy />
            </Route>
            
            <Route exact path="/loan/configuration/:id" >
              <LoanConfiguration />
            </Route>
            
            <Route exact path="/reporttemplates">
              <Report />
            </Route>

            <Route exact path="/myrequest">
              <MyRequest />
            </Route>
            
            <Route exact path="/report">
              <Report />
            </Route>

            <Route exact path="/reporttemplates/new">
              <ReportTemplateCreate />
            </Route>

            <Route exact path="/report/new-pref">
              <ReportTemplatePage />
            </Route>

            <Route exact path="/report/:reportId/generate">
              <GenerateReport />
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
