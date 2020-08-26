import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  Link,
} from "@material-ui/core";
import Computer from "@material-ui/icons/Computer";
import FeaturedPlayListIcon from "@material-ui/icons/FeaturedPlayList";
import AccountCircle from "@material-ui/icons/AccountCircle";
import CreditCard from "@material-ui/icons/CreditCard";
import AccountBalance from "@material-ui/icons/AccountBalance";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  navBar: {
    backgroundColor: "#1876D2",
  },
  homeButton: {
    flexGrow: 2,
    "&:hover": {
      cursor: "pointer",
      color: "#0d47a1"
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
    marginTop: theme.spacing(0.3),
    width: 20,
    height: 20,
  },
}));

/** @returns {jsx} Handles Navigation for Helix Regulatory DashBoard. */
const Navigation = () => {
  const history = useHistory();
  const classes = useStyles();

  const handleHome = () => {
    history.push(`/`);
  };

  return (
    <div className={classes.root}>
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
  );
};

export default Navigation;
