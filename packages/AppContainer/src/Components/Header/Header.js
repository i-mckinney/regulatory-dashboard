import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import { makeStyles } from "@material-ui/core/styles"
import { HelixTextField } from "helixmonorepo-lib"
import helixLogo from "./helixLogo.jpg"
import Navigation from "./Navigation"

const headerStyles = makeStyles(() => ({
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
  // headerStyles define styling for material ui. Any className that matches key of headerStyles object above,
  // corresponding styles will be applied
  const headerClasses = headerStyles()

  // when home button is clicked (helix logo) redirects to home page
  const handleHome = () => {
    history.push(`/home`)
    window.location.reload(false)
  }

  // companies is an option selection that contains label and value for selected option
  const companies = [
    {
      value: "Facebook",
      label: "Facebook",
    },
    {
      value: "Amazon",
      label: "Amazon",
    },
    {
      value: "Apple",
      label: "Apple",
    },
    {
      value: "Netflix",
      label: "Netflix",
    },
    {
      value: "Google",
      label: "Google",
    },
  ]

  // This will keep track of what the user selects in company view select field
  const [company, setCompany] = useState("Apple")

  // will be used in the future to send display different nav pages
  const handleChange = (event) => {
    setCompany(event.target.value)
  }

  return (
    <header>
      <div className={headerClasses.companySelectContainer}>
        <input
          type="image"
          className={headerClasses.helixLogoImg}
          src={helixLogo}
          onClick={handleHome}
          alt="helixLogo"
        />
        <HelixTextField
          className={headerClasses.companyFormControl}
          id="outlined-select-currency-native"
          select
          label="Company"
          value={company}
          onChange={handleChange}
          SelectProps={{
            native: true,
          }}
          helperText="Please select your company"
          variant="outlined"
        >
          {companies.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </HelixTextField>
      </div>
      <Navigation handleHome={handleHome} />
    </header>
  )
}

export default Header
