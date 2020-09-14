import React from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import PropTypes from "prop-types"
import Header from "./Components/Header/Header"
import MicroserviceLoader from "./MicroserviceLoader"
import SpogPage from "./Components/Spog/SpogPage"

const {
  REACT_APP_DASHBOARD_HOST: dashboardHost,
  REACT_APP_COMPANY_VIEW_HOST: companyViewHost,
  REACT_APP_USER_HOST: userHost,
} = process.env

const Dashboard = ({ history }) => (
  <MicroserviceLoader history={history} host={dashboardHost} name="Dashboard" />
)

const CompanyView = ({ history }) => (
  <MicroserviceLoader
    history={history}
    host={companyViewHost}
    name="CompanyView"
  />
)

const User = ({ history }) => {
  <MicroserviceLoader history={history} host={userHost} name="User" />
}

const App = () => (
  <BrowserRouter>
    <>
      <Header />
      <Switch>
        <Route exact path="/" component={SpogPage} />
        <Route exact path="/home" component={Dashboard} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/company/:id" component={CompanyView} />
        <Route exact path="/entity" component={Dashboard} />
        <Route exact path="/loan" component={Dashboard} />
        <Route exact path="/regulatory" component={Dashboard} />
        <Route exact path="/myrequest" component={Dashboard} />
        <Route path="/" exact component={User} />
        <Route path="/user/new" component={User}  />
        <Route path="/user/edit/:id" component={User} />
        <Route path="/user/delete/:id" component={User} />
      </Switch>
    </>
  </BrowserRouter>
)

Dashboard.propTypes = {
  history: PropTypes.oneOfType([PropTypes.object]).isRequired,
}
CompanyView.propTypes = {
  history: PropTypes.oneOfType([PropTypes.object]).isRequired,
}
User.propTypes = {
  history: PropTypes.oneOfType([PropTypes.object]).isRequired,
}

export default App