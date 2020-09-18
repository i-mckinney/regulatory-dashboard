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

const navStyles = makeStyles((theme) => ({
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
        marginRight: "auto",
      },
    },
  },
}))

/**
 * @param {func} handleHome func represents when home button is clicked (helix logo) redirects to home page
 * @return {jsx} Contains navbar to handle navigation in dashboard component
 */
function Navigation({ handleHome }) {
  // navStyles define styling for material ui. Any className that matches key of navStyles object above,
  // corresponding styles will be applied
  const navClasses = navStyles()

  return (
    <div className={navClasses.navBarContainer}>
      <AppBar position="static" className={navClasses.navBar}>
        <Toolbar className={navClasses.toolbar}>
          <Breadcrumbs
            aria-label="breadcrumb"
            separator=""
            className={navClasses.breadcrumbs}
          >
            <Typography
              variant="h6"
              onClick={handleHome}
              className={navClasses.homeButton}
            >
              Home
            </Typography>

            <Link color="inherit" href="/dashboard" className={navClasses.link}>
              <Computer className={navClasses.icon} />
              Dashboard
            </Link>

            <Link color="inherit" href="/entity" className={navClasses.link}>
              <AccountBalance className={navClasses.icon} />
              Entity
            </Link>

            <Link color="inherit" href="/loan" className={navClasses.link}>
              <CreditCard className={navClasses.icon} />
              Loan
            </Link>

            <Link
              color="inherit"
              href="/regulatory"
              className={navClasses.link}
            >
              <FeaturedPlayListIcon className={navClasses.icon} />
              Regulatory
            </Link>

            <Link color="inherit" href="/myrequest" className={navClasses.link}>
              <AccountCircle className={navClasses.icon} />
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
