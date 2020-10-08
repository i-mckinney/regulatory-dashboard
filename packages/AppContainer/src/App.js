import React, { useState } from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import PropTypes from "prop-types"
import clsx from "clsx"
import { useTheme, CssBaseline } from "@material-ui/core"
import MicroserviceLoader from "./MicroserviceLoader"
import Header from "./Components/Header/Header"
import containerAppUseStyles from "./ContainerStyles"

const {
  REACT_APP_DASHBOARD_HOST: dashboardHost,
  REACT_APP_COMPANY_VIEW_HOST: companyViewHost,
  REACT_APP_USER_HOST: userHost,
  REACT_APP_LOGIN_HOST: loginViewHost,
} = process.env;

const Dashboard = ({ history }) => (
  <MicroserviceLoader history={history} host={dashboardHost} name='Dashboard' />
);

const CompanyView = ({ history }) => (
  <MicroserviceLoader
    history={history}
    host={companyViewHost}
    name='CompanyView'
  />
);

const LoginView = ({ history }) => (
  <MicroserviceLoader history={history} host={loginViewHost} name='LoginView' />
);

const User = ({ history }) => (
  <MicroserviceLoader history={history} host={userHost} name='User' />
);

const App = () => {
  // Styles for Container application
  const topContainerClasses = containerAppUseStyles()
  // Theme for container application
  const topContainerTheme = useTheme()

  // State to determine whether side navigation is open or not
  const [sideNavOpen, setSideNavOpen] = useState(false)

  return (
    <BrowserRouter>
      <div className={topContainerClasses.topContainerClassesRoot}>
        <CssBaseline />
        <Header
          topContainerClasses={topContainerClasses}
          topContainerTheme={topContainerTheme}
          sideNavOpen={sideNavOpen}
          setSideNavOpen={setSideNavOpen}
        />
        <main
          className={clsx(topContainerClasses.microServiceContent, {
            [topContainerClasses.microServiceContentShift]: sideNavOpen,
          })}
        >
          <div className={topContainerClasses.sideNavDrawerHeader} />
          <Switch>
            <Route exact path='/' component={Dashboard} />
            <Route exact path="/home" component={Dashboard} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/company" component={CompanyView} />
            <Route exact path="/entity" component={Dashboard} />
            <Route exact path="/editentity" component={Dashboard} />
            <Route exact path="/loan" component={Dashboard} />
            <Route exact path="/regulatory" component={Dashboard} />
            <Route exact path="/myrequest" component={Dashboard} />
            <Route exact path="/users" component={User} />
            <Route exact path="/users/new" component={User} />
            <Route exact path="/users/edit/:id" component={User} />
            <Route exact path="/users/delete/:id" component={User} />
          </Switch>
        </main>
      </div>
    </BrowserRouter>
  )
}

Dashboard.propTypes = {
  history: PropTypes.oneOfType([PropTypes.object]).isRequired,
};
CompanyView.propTypes = {
  history: PropTypes.oneOfType([PropTypes.object]).isRequired,
};
User.propTypes = {
  history: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default App;
