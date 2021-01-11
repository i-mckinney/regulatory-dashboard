import React, { useState } from "react";
import { MenuItem, Link } from "@material-ui/core"
import { render, fireEvent } from "@testing-library/react";
import HelixProfileModal from "./index";
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

function ProfileModal() {
    const [anchorEl, setAnchorEl] = React.useState(false);
    const openProfile = Boolean(anchorEl);

    const openProfileModal = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const closeProfileModal = () => {
        setAnchorEl(false);
    }


    const displayMenuItems = () => {
        return (
            [<MenuItem key={"home"}>
                <Link href="/homepage">Home</Link>
            </MenuItem>,
            <MenuItem key={"profile"}>
                <Link href="/users">Profile</Link>
            </MenuItem>,
            <MenuItem key={"account"}>
                My account
            </MenuItem>,
            <MenuItem key={"logout"}>
                <Link href="/">Log Out</Link>
            </MenuItem>
            ]
        )
    }

    return (
        <HelixProfileModal topContainerClasses={topContainerClasses} anchorEl={anchorEl} openProfile={openProfile} openProfileModal={openProfileModal} closeProfileModal={closeProfileModal} displayMenuItems={displayMenuItems} />
    )
}

const setup = () => {
    const utils = render(<ProfileModal />)
    return {
        ...utils,
    }
}

afterEach(() => {
    jest.clearAllMocks();
})

it("should get 'Home' text in menu list", () => {
    const { ...utils } = setup()
    
    const text = utils.getByText("Home")
    expect(text.textContent).toBe("Home")
})

it("should get 'Profile' text in menu list", () => {
    const { ...utils } = setup()
    
    const text = utils.getByText("Profile")
    expect(text.textContent).toBe("Profile")
})

it("should get 'My account' text in menu list", () => {
    const { ...utils } = setup()
    
    const text = utils.getByText("My account")
    expect(text.textContent).toBe("My account") 
})

it("should get 'Log Out' text in menu list", () => {
    const { ...utils } = setup()
    
    const text = utils.getByText("Log Out")
    expect(text.textContent).toBe("Log Out")
})