import React from "react"
import PropTypes from "prop-types"
import clsx from "clsx"
import {
  Drawer,
  Link,
  List,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core"
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft"
import ChevronRightIcon from "@material-ui/icons/ChevronRight"
import Computer from "@material-ui/icons/Computer"
import FeaturedPlayListIcon from "@material-ui/icons/FeaturedPlayList"
import AccountBox from "@material-ui/icons/AccountBox"
import CreditCard from "@material-ui/icons/CreditCard"
import AccountBalance from "@material-ui/icons/AccountBalance"
import BusinessIcon from "@material-ui/icons/Business"
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom"

/**
 * @param {object} topContainerClasses contains styling of useStyles for Container App
 * @param {object} topContainerTheme contains theme for Container App
 * @param {boolean} sideNavOpen boolean to decide whether side nav will be visible or hidden
 * @param {func} setSideNavOpen toggle sideNavOpen between false and true
 * @return {jsx} side navigation bar that can be toggled
 */
function SideNavigationBar(props) {
  const {
    topContainerClasses,
    topContainerTheme,
    sideNavOpen,
    setSideNavOpen,
  } = props

  // Hides side navigation bar
  const closeSideNavbar = () => {
    setSideNavOpen(false)
  }

  return (
    <>
      <Drawer
        className={clsx(
          topContainerClasses.hiddenContainerDrawer,
          sideNavOpen && topContainerClasses.containerDrawer
        )}
        variant="persistent"
        anchor="left"
        open={sideNavOpen}
        classes={{
          paper: topContainerClasses.containerDrawerPaper,
        }}
      >
        <div className={topContainerClasses.sideNavDrawerHeader}>
          <IconButton onClick={closeSideNavbar}>
            {topContainerTheme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {/* <Link color="inherit" href="/dashboard">
            <ListItem button>
              <ListItemIcon>
                <Computer />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
          </Link> */}
          <Link color="inherit" href="/entity">
            <ListItem button>
              <ListItemIcon>
                <AccountBalance />
              </ListItemIcon>
              <ListItemText primary="Entity" />
            </ListItem>
          </Link>
          <Link color="inherit" href="/loan">
            <ListItem button>
              <ListItemIcon>
                <CreditCard />
              </ListItemIcon>
              <ListItemText primary="Loan" />
            </ListItem>
          </Link>
          <Link color="inherit" href="/regulatory">
            <ListItem button>
              <ListItemIcon>
                <FeaturedPlayListIcon />
              </ListItemIcon>
              <ListItemText primary="Regulatory" />
            </ListItem>
          </Link>
          <Link color="inherit" href="/myrequest">
            <ListItem button>
              <ListItemIcon>
                <AccountBox />
              </ListItemIcon>
              <ListItemText primary="My Request" />
            </ListItem>
          </Link>
        </List>
        <Divider />
        <List>
          <Link color="inherit" href="/api-table">
            <ListItem button>
              <ListItemIcon>
                <BusinessIcon />
              </ListItemIcon>
              <ListItemText primary="Custom API" />
            </ListItem>
          </Link>
          <Link color="inherit" href="/">
          <ListItem button>
            <ListItemIcon>
              <MeetingRoomIcon />
            </ListItemIcon>
            <ListItemText primary="Log Out" />
          </ListItem>
          </Link>
        </List>
      </Drawer>
    </>
  )
}

SideNavigationBar.propTypes = {
  topContainerClasses: PropTypes.instanceOf(Object).isRequired,
  topContainerTheme: PropTypes.instanceOf(Object).isRequired,
  sideNavOpen: PropTypes.bool.isRequired,
  setSideNavOpen: PropTypes.func.isRequired,
}

export default SideNavigationBar
