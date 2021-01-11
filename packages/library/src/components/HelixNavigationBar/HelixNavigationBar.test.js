import React, { useState } from "react";
import { useTheme, Typography } from "@material-ui/core"
import { render, fireEvent } from "@testing-library/react";
import HelixNavigationBar from "./index";
import "@testing-library/jest-dom/extend-expect";

import { makeStyles } from "@material-ui/core"

const drawerWidth = 240

// Styles used for Container Application
const topContainerClasses = makeStyles((theme) => ({
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

function NavigationBar() {
    const topContainerTheme = useTheme()

    // State to determine whether side navigation is open or not
    const [sideNavOpen, setSideNavOpen] = useState(false)
    const displayAppName = () => {
        return (
        <Typography variant="h6" noWrap>
            Regulatory Dashboard
        </Typography>
        )
    }

    const displayNotificationModal = () => null


    const displayProfileModal = () => null

    return (
        <HelixNavigationBar displayAppName={displayAppName} displayNotificationModal={displayNotificationModal} displayProfileModal={displayProfileModal} sideNavOpen={sideNavOpen} setSideNavOpen={setSideNavOpen} topContainerTheme={topContainerTheme} topContainerClasses={topContainerClasses} />
    )
}

const setup = () => {
    const utils = render(<NavigationBar />)
    return {
        ...utils,
    }
}

afterEach(() => {
    jest.clearAllMocks();
})

it("should render a navigation bar", () => {
    const { ...utils } = setup()
    
    const appbar = utils.getByRole("banner")
    expect(appbar).toBeDefined()
})

it("should get 'Regulatory Dashboard' text in title", () => {
    const { ...utils } = setup()
    
    const text = utils.getByText("Regulatory Dashboard")
    expect(text.textContent).toBe("Regulatory Dashboard")
})
