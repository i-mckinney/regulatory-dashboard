import React from "react"
import PropTypes from "prop-types"
import NavigationBar from "./NavigationBar"
import SideNavigationBar from "./SideNavigationBar"

/**
 * @param {object} topContainerClasses contains styling of useStyles for Container App
 * @param {object} topContainerTheme contains theme for Container App
 * @param {boolean} sideNavOpen boolean to decide whether side nav will be visible or hidden
 * @param {func} setSideNavOpen toggle sideNavOpen between false and true
 * @return {jsx} returns Header component that is shared across micro services
 * Contains top navigation bar to handle navigation in dashboard component
 * Contains side navigation bar that can be toggled
 */
function Header(props) {
  const {
    topContainerClasses,
    topContainerTheme,
    sideNavOpen,
    setSideNavOpen,
  } = props
  return (
    <>
      <NavigationBar
        topContainerClasses={topContainerClasses}
        sideNavOpen={sideNavOpen}
        setSideNavOpen={setSideNavOpen}
      />
      <SideNavigationBar
        topContainerClasses={topContainerClasses}
        topContainerTheme={topContainerTheme}
        sideNavOpen={sideNavOpen}
        setSideNavOpen={setSideNavOpen}
      />
    </>
  )
}

Header.propTypes = {
  topContainerClasses: PropTypes.instanceOf(Object).isRequired,
  topContainerTheme: PropTypes.instanceOf(Object).isRequired,
  sideNavOpen: PropTypes.bool.isRequired,
  setSideNavOpen: PropTypes.func.isRequired,
}

export default Header
