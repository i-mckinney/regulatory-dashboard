import React, { useState } from "react"
import HelixHorizontalTabs from "../components/HelixHorizontalTabs/index"
import HelixTabPanel from "../components/HelixTabPanel/index"
import { Tab } from "@material-ui/core"
import { withKnobs } from "@storybook/addon-knobs"
import CssBaseline from "@material-ui/core/CssBaseline"
import ThemeSelector from "../themes/ThemeSelector"

export default {
  title: "Helix Components/Helix Horizontal Tabs with Tab Panel",
  decorators: [withKnobs],
  component: HelixHorizontalTabs,
}

/**
 *
 * HelixHorizontalTabsWithTabPanel.stories.js contains this code.
 * the index.js file that is in the same folder HelixHorizontalTabs is straight from our repo
 * this file is loading that code.
 * @title is the name of the component "Story" folder
 * @component needs to be set to the import component for the cool controls to populate
 * @ThemeSelector is this goofy way I figured out how to change themes on the components
 * @decorator You have to add the decorator withKnobs for it to work.
 *
 */

// reportTabs contains mock data of array of strings
const reportTabs = ["Tab #1", "Tab #2", "Tab #3"]

// panelReports contains mock data of array of strings
const panelReports = [
  "Report Normalization #1",
  "Report Normalization #2",
  "Report Normalization #3",
]

// renderHelixTabs return a list of Helix Tab jsx object
const renderHelixTabs = () => {
  return reportTabs.map((tab, tabIndex) => {
    return <Tab key={tabIndex} label={tab} />
  })
}

// renderHelixPanelTabs return a list of HelixTabPanel jsx object
const renderHelixPanelTabs = (newValue) => {
  return panelReports.map((panelTab, panelTabIndex) => {
    return (
      <HelixTabPanel key={panelTabIndex} value={newValue} index={panelTabIndex}>
        <ul>
          <li>{`Tab #${panelTab}`}</li>
        </ul>
      </HelixTabPanel>
    )
  })
}

/**
 * @param {object} args represents arguments that SampleHelixHorizontalTabsWithTabPanel needs
 */
export const SampleHelixHorizontalTabsWithTabPanel = (args) => {
  const [value, setValue] = useState(1)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  args.value = value
  args.handleChange = handleChange

  return (
    <ThemeSelector>
      <CssBaseline />
      <HelixHorizontalTabs {...args} />
    </ThemeSelector>
  )
}

/**
 * SampleHelixHorizontalTabsWithTabPanel.args are arguments will provide to SampleHelixHorizontalTabsWithTabPanel to work functionality
 */
SampleHelixHorizontalTabsWithTabPanel.args = {
  renderHelixPanelTabs: renderHelixPanelTabs,
  renderHelixTabs: renderHelixTabs,
}

SampleHelixHorizontalTabsWithTabPanel.parameters = {
  jest: ["HelixHorizontalTabs.test.js", "HelixTabPanel.test.js"],
}
