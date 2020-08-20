import React from "react"
import { useHistory } from "react-router-dom"
import {
  BottomNavigation,
  BottomNavigationAction,
  makeStyles,
} from "@material-ui/core"
import Computer from "@material-ui/icons/Computer"
import FeaturedPlayListIcon from "@material-ui/icons/FeaturedPlayList"
import AccountCircle from "@material-ui/icons/AccountCircle"
import CreditCard from "@material-ui/icons/CreditCard"
import AccountBalance from "@material-ui/icons/AccountBalance"
import helixLogo from "../helixLogo.jpg"

const useStyles = makeStyles({
  root: {
    display: "grid",
  },

  homeButton: {
    backgroundColor: "white",
    border: "none",
    width: "300px",
    marginTop: "15px",
    gridArea: "1 / 1 / row1-end / 3",
  },

  NavigationBar: {
    marginTop: "15px",
    marginRight: "15px",
    gridArea: "1 / 4 / row1-end / 6",
  },
})

/** @returns {jsx} Handles Navigation for Helix Regulatory DashBoard. */
const Navigation = () => {
  const history = useHistory()
  const classes = useStyles()
  const [value, setValue] = React.useState(0)

  const handleHome = () => {
    setValue(0)
    history.push(`/`)
  }

  return (
    <div>
      <div className={classes.root}>
        <button
          onClick={handleHome}
          type="button"
          className={classes.homeButton}
        >
          <img src={helixLogo} alt="helixLogo" />
        </button>
        <BottomNavigation
          value={value}
          className={classes.NavigationBar}
          onChange={(event, newValue) => {
            setValue(newValue)
            history.push(`/${newValue}`)
          }}
          showLabels
        >
          <BottomNavigationAction
            value="Dashboard"
            label="Dashboard"
            icon={<Computer />}
          />
          <BottomNavigationAction
            value="Entity"
            label="Entity"
            icon={<AccountBalance />}
          />
          <BottomNavigationAction
            value="Loan"
            label="Loan"
            icon={<CreditCard />}
          />
          <BottomNavigationAction
            label="Regulatory"
            value="Regulatory"
            icon={<FeaturedPlayListIcon />}
          />
          <BottomNavigationAction
            value="myrequest"
            label="My Request"
            icon={<AccountCircle />}
          />
        </BottomNavigation>
      </div>
    </div>
  )
}

export default Navigation
