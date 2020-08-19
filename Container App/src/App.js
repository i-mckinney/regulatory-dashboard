import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Header from './Components/Header/Header';
import MicroserviceLoader from './MicroserviceLoader';
import SpogPage from './Components/Spog/SpogPage'

const {
  REACT_APP_DASHBOARD_HOST: dashboardHost,
  REACT_APP_COMPANY_VIEW_HOST: companyViewHost
} = process.env;

const Dashboard = ({ history }) => (
  <MicroserviceLoader history={history} host={dashboardHost} name="Dashboard" />
)

const CompanyView = ({ history }) => (
  <MicroserviceLoader history={history} host={companyViewHost} name="CompanyView" />
)

const App = () => (
  <BrowserRouter>
    <React.Fragment>
      <Header />
      <Switch>
        <Route exact path='/' component={SpogPage} />
        <Route exact path="/dashboard" component={Dashboard}/>
        <Route exact path="/company/:id" component={CompanyView} />
      </Switch>
    </React.Fragment>
  </BrowserRouter>
);

export default App;
