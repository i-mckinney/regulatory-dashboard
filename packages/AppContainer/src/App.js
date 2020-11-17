import React, { useState } from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import PropTypes from "prop-types"
import clsx from "clsx"
import {
  useTheme,
  CssBaseline,
  StylesProvider,
  createGenerateClassName,
  makeStyles,
} from "@material-ui/core"
import MicroserviceLoader from "./MicroserviceLoader"
import Header from "./Components/Header/Header"

const drawerWidth = 240

// Styles used for Container Application
const containerAppUseStyles = makeStyles((theme) => ({
  containerUserPageButton: {
    marginLeft: "auto",
  },
  topContainerClassesRoot: {
    display: "flex",
  },
  containerAppBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  containerAppBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  containerAppMenuButton: {
    marginRight: theme.spacing(2),
  },
  hideContainerComponents: {
    display: "none",
  },
  hiddenContainerDrawer: {
    width: 0,
  },
  containerDrawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  containerDrawerPaper: {
    width: drawerWidth,
  },
  sideNavDrawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  microServiceContent: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    // marginLeft: "auto",
  },
  microServiceContentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    // marginLeft: 240,
  },
}))
const {
  REACT_APP_DASHBOARD_HOST: dashboardHost,
  REACT_APP_COMPANY_VIEW_HOST: companyViewHost,
  REACT_APP_USER_HOST: userHost,
  REACT_APP_LOGIN_HOST: loginViewHost,
} = process.env

const generateClassName = createGenerateClassName({
  productionPrefix: "app-container-",
  seed: "app",
})

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

const LoginView = ({ history }) => (
  <MicroserviceLoader history={history} host={loginViewHost} name="LoginView" />
)

const User = ({ history }) => (
  <MicroserviceLoader history={history} host={userHost} name="User" />
)

const App = () => {
  // Styles for Container application
  const topContainerClasses = containerAppUseStyles()
  // Theme for container application
  const topContainerTheme = useTheme()

  // State to determine whether side navigation is open or not
  const [sideNavOpen, setSideNavOpen] = useState(false)

  return (
    <div>
      <CssBaseline />
      <StylesProvider generateClassName={generateClassName}>
        <BrowserRouter>
        <div className={topContainerClasses.topContainerClassesRoot}>
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
              <Route exact path="/" component={LoginView} />
              <Route exact path="/homepage" component={Dashboard} />
              {/* <Route exact path="/dashboard" component={Dashboard} /> */}
              <Route exact path="/company" component={CompanyView} />
              <Route exact path="/entity" component={Dashboard} />
              <Route exact path="/entity/new" component={Dashboard} />
              <Route exact path="/entity/configuration" component={Dashboard} />
              <Route exact path="/entity/:id/discrepancy-report" component={Dashboard} />
              <Route exact path="/entity/edit/:id" component={Dashboard} />
              <Route exact path="/entity/delete/:id" component={Dashboard} />
              <Route exact path="/report" component={Dashboard} />
              <Route exact path="/report/new" component={Dashboard} />
              <Route exact path="/report/edit/:id" component={Dashboard} />
              <Route exact path="/report/delete/:id" component={Dashboard} />
              <Route exact path="/loan" component={Dashboard} />
              <Route exact path="/regulatory" component={Dashboard} />
              <Route exact path="/myrequest" component={Dashboard} />
              <Route exact path="/users" component={User} />
              <Route exact path="/users/new" component={User} />
              <Route exact path="/users/edit/:id" component={User} />
              <Route exact path="/users/delete/:id" component={User} />
              <Route exact path="/api-table" component={CompanyView} />
            </Switch>
          </main>
        </div>
      </BrowserRouter>
    </StylesProvider>
  </div>
  )
}

Dashboard.propTypes = {
  history: PropTypes.oneOfType([PropTypes.object]).isRequired,
}
CompanyView.propTypes = {
  history: PropTypes.oneOfType([PropTypes.object]).isRequired,
}
User.propTypes = {
  history: PropTypes.oneOfType([PropTypes.object]).isRequired,
}
LoginView.propTypes = {
  history: PropTypes.oneOfType([PropTypes.object]).isRequired,
}

export default App
