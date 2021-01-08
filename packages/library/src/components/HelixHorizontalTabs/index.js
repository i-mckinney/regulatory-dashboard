import React from "react"
import PropTypes from "prop-types"
import { makeStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import Typography from "@material-ui/core/Typography"
import Box from "@material-ui/core/Box"

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  }
}

const useHelixHorizontalTabsStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(1),
    display: "grid",
    width: "100%",
    justifyContent: "space-between",
  },
  tabContainer: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    position: "sticky",
    left: "0",
    top: "56px",
  },
}))

export default function SimpleTabs() {
  const helixHorizontalTabsClasses = useHelixHorizontalTabsStyles()
  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Box className={helixHorizontalTabsClasses.container}>
      <div className={helixHorizontalTabsClasses.tabContainer}>
        <AppBar position="static">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
            className={helixHorizontalTabsClasses.tabs}
          >
            <Tab label="Tab One" {...a11yProps(0)} />
            <Tab label="Tab Two" {...a11yProps(1)} />
            <Tab label="Tab Three" {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          Panel One
        </TabPanel>
        <TabPanel value={value} index={1}>
          Panel Two
        </TabPanel>
        <TabPanel value={value} index={2}>
          Panel Three
        </TabPanel>
      </div>
    </Box>
  )
}
