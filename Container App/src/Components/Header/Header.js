import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  BottomNavigation,
  BottomNavigationAction,
  makeStyles,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@material-ui/core";
import Computer from "@material-ui/icons/Computer";
import FeaturedPlayListIcon from "@material-ui/icons/FeaturedPlayList";
import AccountCircle from "@material-ui/icons/AccountCircle";
import CreditCard from "@material-ui/icons/CreditCard";
import AccountBalance from "@material-ui/icons/AccountBalance";
import helixLogo from "./helixLogo.jpg";

//TODO Make Company List Dynamic

const useStyles = makeStyles((theme) => ({
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

  companySelect: {
    minWidth: "300px",
  },

  formControl: {
    marginTop: "15px",
    minWidth: 120,
  },
}));

function Header() {
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
      <div className="center-column">
        <button
          onClick={handleHome}
          type="button"
          className={classes.homeButton}
        >
          <img src={helixLogo} alt="helixLogo" />
        </button>
        <FormControl className={classes.formControl}>
          <InputLabel id="company-select-label">Company View</InputLabel>
          <Select
            labelId="company-select"
            id="company-select"
            className={classes.companySelect}
            value={companyView}
            onChange={handleCompanyViewChange}
          >
            <MenuItem value={""}></MenuItem>
            <MenuItem value={"Microsoft"}>Microsoft</MenuItem>
            <MenuItem value={"SalesForce"}>Sales Force</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className={classes.root}>
        <BottomNavigation
          className={classes.NavigationBar}
          onChange={(event, newRoute) => {
            history.push(`/${newRoute}`);
            window.location.reload(false);
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
    </header>
  );
}

export default Header;
