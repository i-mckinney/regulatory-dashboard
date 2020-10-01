import React, { useEffect, useState } from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import PropTypes from "prop-types"
import clsx from "clsx"
import { useTheme, CssBaseline } from "@material-ui/core"
import MicroserviceLoader from "./MicroserviceLoader"
import SpogPage from "./Components/Spog/SpogPage"
import Header from "./Components/Header/Header"
import containerAppUseStyles from "./ContainerStyles"
import { useQuery, gql } from '@apollo/client';

const {
  REACT_APP_DASHBOARD_HOST: dashboardHost,
  REACT_APP_COMPANY_VIEW_HOST: companyViewHost,
  REACT_APP_USER_HOST: userHost,
  REACT_APP_LOGIN_HOST: loginViewHost
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

const WHO_AM_I = gql`
query whoAmI {
  whoAmI {
    email
  }
}
`;

// const fetchUser = () => {
//   const { data, loading, error } = useQuery(WHO_AM_I);
//   if (data.whoAmI !== null && loggedIn === false) setLogIn(true)
// }

const App = () => {
  const [loggedIn, setLogIn] = useState(false)

  const { data, loading, error } = useQuery(WHO_AM_I);
  if (loading) return <p>loading</p>;
  if (error) return <p>ERROR `${JSON.stringify(error)}`</p>;
  if (!data) return <p>Not found</p>;
  if (data.whoAmI !== null && loggedIn === false) setLogIn(true)


  if (loggedIn) {
    return (
      <BrowserRouter>
        <>
          <Header />
          <Switch>
            <Route exact path='/' component={LoginView} />
            <Route exact path='/spogpage' component={SpogPage} />
            <Route exact path='/home' component={Dashboard} />
            <Route exact path='/dashboard' component={Dashboard} />
            <Route exact path='/company/:id' component={CompanyView} />
            <Route exact path='/entity' component={Dashboard} />
            <Route exact path='/loan' component={Dashboard} />
            <Route exact path='/regulatory' component={Dashboard} />
            <Route exact path='/myrequest' component={Dashboard} />
            <Route exact path='/user' component={User} />
            <Route exact path='/user/new' component={User} />
            <Route exact path='/user/edit/:id' component={User} />
            <Route exact path='/user/delete/:id' component={User} />
          </Switch>
        </>
      </BrowserRouter>
    )

  } else {
    return (
      <BrowserRouter>
        <>
          <Route exact path='/' component={LoginView} />
        </>
      </BrowserRouter>
    )
  }

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
