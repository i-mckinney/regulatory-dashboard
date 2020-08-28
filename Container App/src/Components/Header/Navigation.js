import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import {
  AppBar,
  Toolbar,
  Typography,
  Link,
  Breadcrumbs,
} from "@material-ui/core"
import Computer from "@material-ui/icons/Computer"
import FeaturedPlayListIcon from "@material-ui/icons/FeaturedPlayList"
import AccountCircle from "@material-ui/icons/AccountCircle"
import CreditCard from "@material-ui/icons/CreditCard"
import AccountBalance from "@material-ui/icons/AccountBalance"
import PropTypes from "prop-types"

const useStyles = makeStyles((theme) => ({
  navBarContainer: {
    flexGrow: 1,
  },
  navBar: {
    backgroundColor: "#1876D2",
  },
  homeButton: {
    "&:hover": {
      cursor: "pointer",
      color: "#0d47a1",
    },
  },
  link: {
    marginRight: theme.spacing(1),
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
  toolbar: {
    display: "grid",
  },
  breadcrumbs: {
    "& li": {
      "&:first-child": {
        flexGrow: 1,
      },
    },
  },
}))

/** @return {jsx} Contains navbar to handle navigation in dashboard component
 */
function Navigation({ handleHome }) {
  // useStyles define styling for material ui. Any className that matches key of useStyles object above,
  // corresponding styles will be applied
  const classes = useStyles()

  return (
    <div className={classes.navBarContainer}>
      <AppBar position="static" className={classes.navBar}>
        <Toolbar className={classes.toolbar}>
          <Breadcrumbs
            aria-label="breadcrumb"
            separator=""
            className={classes.breadcrumbs}
          >
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
          </Breadcrumbs>
        </Toolbar>
      </AppBar>
    </div>
  )
}

Navigation.propTypes = {
  handleHome: PropTypes.func.isRequired,
}

export default Navigation
