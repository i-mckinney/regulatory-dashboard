import React, { useEffect, useState, createContext } from "react"
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom"
import PropTypes from "prop-types"
import clsx from "clsx"
import { useTheme, CssBaseline } from "@material-ui/core"
import { useQuery, gql } from "@apollo/client"
import MicroserviceLoader from "./MicroserviceLoader"
import SpogPage from "./Components/Spog/SpogPage"
import Header from "./Components/Header/Header"
import containerAppUseStyles from "./ContainerStyles"


const defaultUser = {
  id: null,
  email: null,
  analyst: false,
  admin: false,
  supervisor: false,
}
const UserCtx = React.createContext(defaultUser);


const {
  REACT_APP_DASHBOARD_HOST: dashboardHost,
  REACT_APP_COMPANY_VIEW_HOST: companyViewHost,
  REACT_APP_USER_HOST: userHost,
  REACT_APP_LOGIN_HOST: loginViewHost,
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

const LoginView = ({ history }) => (
  <MicroserviceLoader history={history} host={loginViewHost} name="LoginView" />
)

const User = ({ history }) => (
  <MicroserviceLoader history={history} host={userHost} name="User" />
)

const WHO_AM_I = gql`
  query whoAmI {
    whoAmI {
      email
    }
  }
`

const App = () => {
  const [loggedIn, setLogIn] = useState(false)
  // Styles for Container application
  const topContainerClasses = containerAppUseStyles()
  // Theme for container application
  const topContainerTheme = useTheme()

  // State to determine whether side navigation is open or not
  const [sideNavOpen, setSideNavOpen] = useState(false)

  const { data, loading, error } = useQuery(WHO_AM_I)
  if (loading) return <p>loading</p>
  if (error) return <p>ERROR `${JSON.stringify(error)}`</p>
  if (!data) return <p>Not found</p>
  if (data.whoAmI !== null && loggedIn === false) setLogIn(true)

  if (loggedIn) {
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
              <Route exact path="/" component={Dashboard} />
              <Route exact path="/spogpage" component={SpogPage} />
              <Route exact path="/home" component={Dashboard} />
              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/company/:id" component={CompanyView} />
              <Route exact path="/entity" component={Dashboard} />
              <Route exact path="/loan" component={Dashboard} />
              <Route exact path="/regulatory" component={Dashboard} />
              <Route exact path="/myrequest" component={Dashboard} />
              <Route exact path="/user" component={User} />
              <Route exact path="/user/new" component={User} />
              <Route exact path="/user/edit/:id" component={User} />
              <Route exact path="/user/delete/:id" component={User} />
            </Switch>
          </main>
        </div>
      </BrowserRouter>
    )
  }
  return (
    <BrowserRouter>
      <>
        <Route exact path="/" component={LoginView} />
        <Redirect to="/" />
      </>
    </BrowserRouter>
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

export default App
