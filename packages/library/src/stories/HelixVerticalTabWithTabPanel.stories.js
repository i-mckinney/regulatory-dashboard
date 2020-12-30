import React from "react";
import HelixVerticalTab from "../components/HelixVerticalTab/index"
import HelixTabPanel from "../components/HelixTabPanel/index"
import { Tab } from "@material-ui/core"
import { withKnobs } from "@storybook/addon-knobs"
import CssBaseline from "@material-ui/core/CssBaseline"
import ThemeSelector from "../themes/ThemeSelector"

export default {
    title:"Helix Components/Helix Vertical Tab with Tab Panel",
    decorators: [withKnobs],
    component: HelixVerticalTab,
}

/**
 * 
 * HelixVerticalTabWithTabPanel.stories.js contains this code. 
 * the index.js file that is in the same folder HelixVerticalTab is straight from our repo
 * this file is loading that code.
 * @title is the name of the component "Story" folder
 * @component needs to be set to the import component for the cool controls to populate
 * @ThemeSelector is this goofy way I figured out how to change themes on the components 
 * @decorator You have to add the decorator withKnobs for it to work.
 * 
 */

const reportTabs = ["Tab #1",  "Tab #2", "Tab #3"]
  
const panelReports = ["Report Normalization #1", "Report Normalization #2", "Report Normalization #3"]

// renderHelixTabs return a list of Helix Tab jsx object
const renderHelixTabs = () => {
    return reportTabs.map((tab, tabIndex) => {
        return (
            <Tab 
            key={tabIndex} 
            label={tab}
            />
        )
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
 * @param {object} args represents arguments that SampleHelixVerticalTabWithTabPanel needs
 */
export const SampleHelixVerticalTabWithTabPanel = (args) => {
    return (
        <ThemeSelector>
            <CssBaseline />
            <HelixVerticalTab {...args} />
        </ThemeSelector>
    )
}

/**
 * SampleHelixVerticalTabWithTabPanel.args are arguments will provide to SampleHelixVerticalTabWithTabPanel to work functionality
 */
SampleHelixVerticalTabWithTabPanel.args = {
    renderHelixPanelTabs: renderHelixPanelTabs,
    renderHelixTabs: renderHelixTabs,
    handleChange: () => null,
    value: 1
}