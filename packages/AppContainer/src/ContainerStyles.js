import { makeStyles } from "@material-ui/core"

const drawerWidth = 240

// Styles used for Container Application
const containerAppUseStyles = makeStyles((theme) => ({
  containerUserPageButton: {
    marginLeft: "auto",
  },
  topContainerClassesRoot: {
    display: "flex",
  },
  containerAppBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  containerAppBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  containerAppMenuButton: {
    marginRight: theme.spacing(2),
  },
  hideContainerComponents: {
    display: "none",
  },
  hiddenContainerDrawer: {
    width: 0,
  },
  containerDrawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  containerDrawerPaper: {
    width: drawerWidth,
  },
  sideNavDrawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  microServiceContent: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    // marginLeft: "auto",
  },
  microServiceContentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    // marginLeft: 240,
  },
}))

export default containerAppUseStyles
