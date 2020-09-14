import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import { makeStyles } from "@material-ui/core/styles"
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core"
import helixLogo from "./helixLogo.jpg"
import Navigation from "./Navigation"

const useStyles = makeStyles(() => ({
  companySelectContainer: {
    marginBottom: "20px",
  },
  helixLogoImg: {
    backgroundColor: "white",
    border: "none",
    "&:hover": {
      cursor: "pointer",
      outline: "none",
    },
    "&:active": {
      marginTop: "15px",
      marginBottom: 0,
      marginRight: 5,
    },
    marginTop: "15px",
    marginBottom: 0,
    marginRight: 5,
  },

  companySelectField: {
    minWidth: "300px",
  },
  companyFormControl: {
    marginTop: "15px",
    minWidth: 120,
  },
}))

/** @return {jsx} returns Header component that is shared across micro services
 * Contains company selection that will set company view
 * Contains navbar to handle navigation in dashboard component
 */
function Header() {
  // History is used to handle page routes
  const history = useHistory()
  // useStyles define styling for material ui. Any className that matches key of useStyles object above,
  // corresponding styles will be applied
  const classes = useStyles()

  // when home button is clicked (helix logo) redirects to home page
  const handleHome = () => {
    history.push(`/home`)
    window.location.reload(false)
  }

  // This will keep track of what the user selects in company view select field
  const [companyView, setCompanyView] = useState("")
  // will be used in the future to send display different nav pages
  const handleCompanyViewChange = (event) => {
    setCompanyView(event.target.value)
  }
  return (
    <header>
      <div className={classes.companySelectContainer}>
        <input
          type="image"
          className={classes.helixLogoImg}
          src={helixLogo}
          onClick={handleHome}
          alt="helixLogo"
        />
        <FormControl className={classes.companyFormControl}>
          <InputLabel id="company-select-label">Company View</InputLabel>
          <Select
            labelId="company-select"
            id="company-select"
            className={classes.companySelectField}
            value={companyView}
            onChange={handleCompanyViewChange}
          >
            <MenuItem value="" />
            <MenuItem value="Microsoft">Microsoft</MenuItem>
            <MenuItem value="SalesForce">Sales Force</MenuItem>
          </Select>
        </FormControl>
      </div>
      <Navigation handleHome={handleHome} />
    </header>
  )
}

export default Header
