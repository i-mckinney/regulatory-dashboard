import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  Link,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import Computer from "@material-ui/icons/Computer";
import FeaturedPlayListIcon from "@material-ui/icons/FeaturedPlayList";
import AccountCircle from "@material-ui/icons/AccountCircle";
import CreditCard from "@material-ui/icons/CreditCard";
import AccountBalance from "@material-ui/icons/AccountBalance";
import helixLogo from "../helixLogo.jpg";

const useStyles = makeStyles((theme) => ({
  navBarContainer: {
    flexGrow: 1,
    marginTop: 10,
  },
  navBar: {
    backgroundColor: "#1876D2",
  },
  homeButton: {
    flexGrow: 2,
    "&:hover": {
      cursor: "pointer",
      color: "#0d47a1",
    },
  },
  link: {
    marginRight: theme.spacing(3),
    display: "flex",
    color: "white",
    "&:hover": {
      textDecoration: "none",
    },
  },
  icon: {
    marginRight: theme.spacing(0.5),
    marginTop: ".8px",
    width: 20,
    height: 20,
  },
}));

/**@return {jsx} returns Navigation component that is shared across micro services
 * Contains company selection that will set company view
 * Contains navbar to handle navigation in dashboard component
 */
function Navigation() {
  //History is used to handle page routes
  const history = useHistory();
  //useStyles define styling for material ui. Any className that matches key of useStyles object above,
  // corresponding styles will be applied
  const classes = useStyles();

  //when home button is clicked (helix logo) redirects to home page
  const handleHome = () => {
    history.push(`/home`);
    window.location.reload(false);
  };

  //This will keep track of what the user selects in company view select field
  const [companyView, setCompanyView] = useState("");
  //will be used in the future to send display different nav pages
  const handleCompanyViewChange = (event) => {
    setCompanyView(event.target.value);
  };
  return (
    <header>
      <div className={classes.navBarContainer}>
        <AppBar position="static" className={classes.navBar}>
          <Toolbar>
            <Typography
              variant="h6"
              onClick={handleHome}
              className={classes.homeButton}
            >
              Home
            </Typography>

            <Link color="inherit" href="/dashboard" className={classes.link}>
              <Computer className={classes.icon} />
              Dashboard
            </Link>

            <Link color="inherit" href="/entity" className={classes.link}>
              <AccountBalance className={classes.icon} />
              Entity
            </Link>

            <Link color="inherit" href="/loan" className={classes.link}>
              <CreditCard className={classes.icon} />
              Loan
            </Link>

            <Link color="inherit" href="/regulatory" className={classes.link}>
              <FeaturedPlayListIcon className={classes.icon} />
              Regulatory
            </Link>

            <Link color="inherit" href="/myrequest" className={classes.link}>
              <AccountCircle className={classes.icon} />
              My Request
            </Link>
          </Toolbar>
        </AppBar>
      </div>
    </header>
  );
}

export default Navigation;
