import React from "react"
import clsx from "clsx"
import { AppBar, Toolbar, Typography, IconButton } from "@material-ui/core"
import MenuIcon from "@material-ui/icons/Menu"
import PropTypes from "prop-types"
import ProfileModal from "./ProfileModal"

/**
 * @param {object} topContainerClasses contains styling of useStyles for Container App
 * @param {boolean} sideNavOpen boolean to decide whether side nav will be visible or hidden
 * @param {func} setSideNavOpen toggle sideNavOpen between false and true
 * @return {jsx} top navigation bar to handle navigation in dashboard component
 */
function NavigationBar(props) {
  const { topContainerClasses, sideNavOpen, setSideNavOpen } = props

  /** When you click hamburger icon, function gets invoked and makes Side Navbar visible */
  const openSideNavBar = () => {
    setSideNavOpen(true)
  }

  return (
    <>
      <AppBar
        style={{ backgroundColor: "#1876D2" }}
        position="fixed"
        className={clsx(topContainerClasses.containerAppBar, {
          [topContainerClasses.containerAppBarShift]: sideNavOpen,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={openSideNavBar}
            edge="start"
            className={clsx(
              topContainerClasses.containerAppMenuButton,
              sideNavOpen && topContainerClasses.hideContainerComponents
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Regulatory Dashboard
          </Typography>
          <ProfileModal topContainerClasses={topContainerClasses} />
        </Toolbar>
      </AppBar>
    </>
  )
}

NavigationBar.propTypes = {
  topContainerClasses: PropTypes.instanceOf(Object).isRequired,
  sideNavOpen: PropTypes.bool.isRequired,
  setSideNavOpen: PropTypes.func.isRequired,
}

export default NavigationBar
