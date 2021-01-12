import React, { useState } from "react";
import {
    useTheme,
    Link,
    ListItem,
    ListItemIcon,
    ListItemText,
  } from "@material-ui/core"
import FeaturedPlayListIcon from "@material-ui/icons/FeaturedPlayList"
import AccountBox from "@material-ui/icons/AccountBox"
import CreditCard from "@material-ui/icons/CreditCard"
import AccountBalance from "@material-ui/icons/AccountBalance"
import BusinessIcon from "@material-ui/icons/Business"
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom"
import { render } from "@testing-library/react";
import HelixSideNavigationBar from "./index";
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

function SideNavigationBar() {
    const topContainerTheme = useTheme()

    // State to determine whether side navigation is open or not
    const [sideNavOpen, setSideNavOpen] = useState(false)

    const displayMajorComponentLinks = () => {
        return (
            [
            <Link color="inherit" href="/entity" key={"entity"}>
            <ListItem button>
              <ListItemIcon>
                <AccountBalance />
              </ListItemIcon>
              <ListItemText primary="Entity" />
            </ListItem>
            </Link>,
            <Link color="inherit" href="/loan" key={"loan"}>
                <ListItem button>
                <ListItemIcon>
                    <CreditCard />
                </ListItemIcon>
                <ListItemText primary="Loan" />
                </ListItem>
            </Link>,
            <Link color="inherit" href="/reporttemplates" key={"reporttemplates"}>
                <ListItem button>
                <ListItemIcon>
                    <FeaturedPlayListIcon />
                </ListItemIcon>
                <ListItemText primary="Report Templates" />
                </ListItem>
            </Link>,
            <Link color="inherit" href="/myrequest" key={"myrequest"}>
                <ListItem button>
                <ListItemIcon>
                    <AccountBox />
                </ListItemIcon>
                <ListItemText primary="My Request" />
                </ListItem>
            </Link>
            ]
        )
    }
    const displayMinorComponentsLinks = () => {
        return (
            [
                <Link color="inherit" href="/api-table" key={"customapi"}>
                    <ListItem button>
                    <ListItemIcon>
                        <BusinessIcon />
                    </ListItemIcon>
                    <ListItemText primary="Custom API" />
                    </ListItem>
                </Link>,
                <Link color="inherit" href="/" key={"logout"}>
                    <ListItem button>
                        <ListItemIcon>
                        <MeetingRoomIcon />
                        </ListItemIcon>
                        <ListItemText primary="Log Out" />
                    </ListItem>
                </Link>
            ]
        )
    }

    return (
        <HelixSideNavigationBar sideNavOpen={sideNavOpen} setSideNavOpen={setSideNavOpen} displayMajorComponentLinks={displayMajorComponentLinks} displayMinorComponentsLinks={displayMinorComponentsLinks} topContainerTheme={topContainerTheme} topContainerClasses={topContainerClasses} />
    )
}

const setup = () => {
    const utils = render(<SideNavigationBar />)
    return {
        ...utils,
    }
}

afterEach(() => {
    jest.clearAllMocks();
})

it("should get 'Entity' text in side nav bar", () => {
    const { ...utils } = setup()
    
    const text = utils.getByText("Entity")
    expect(text.textContent).toBe("Entity")
})

it("should get 'Loan' text in side nav bar", () => {
    const { ...utils } = setup()
    
    const text = utils.getByText("Loan")
    expect(text.textContent).toBe("Loan")
})

it("should get 'Report Templates' text in side nav bar", () => {
    const { ...utils } = setup()
    
    const text = utils.getByText("Report Templates")
    expect(text.textContent).toBe("Report Templates")
})

it("should get 'My Request' text in side nav bar", () => {
    const { ...utils } = setup()
    
    const text = utils.getByText("My Request")
    expect(text.textContent).toBe("My Request")
})

it("should get 'Log Out' text in side nav bar", () => {
    const { ...utils } = setup()
    
    const text = utils.getByText("Log Out")
    expect(text.textContent).toBe("Log Out")
})
