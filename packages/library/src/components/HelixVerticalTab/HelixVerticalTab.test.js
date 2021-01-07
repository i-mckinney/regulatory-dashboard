import React, { useState } from "react";
import { Tab } from '@material-ui/core';
import { render, fireEvent } from "@testing-library/react";
import HelixVerticalTab from "./index";
import HelixTabPanel from '../HelixTabPanel/index'
import "@testing-library/jest-dom/extend-expect";

function VerticalTabs() {
    const [value, setValue] = useState(0);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
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
                    <li>{`${panelTab}`}</li>
                </ul>
            </HelixTabPanel>
          )
      })
    }

    return (
        <HelixVerticalTab handleChange={handleChange} value={value} renderHelixTabs={renderHelixTabs} renderHelixPanelTabs={renderHelixPanelTabs}/>
    )
}

const setup = () => {
    const utils = render(<VerticalTabs />)
    return {
        ...utils
    }
}

afterEach(() => {
    jest.clearAllMocks();
})

it("should render Vertical Tabs component", () => {
    const { ...utils } = setup()

    const tab = utils.getAllByRole("tab")

    expect(tab).toBeDefined()
})

describe("Vertical Tabs should", () => {
    it("be at Tab #1 tab and Report Normalization #1 panel should display", async () => {
        const { ...utils } = setup()
    
        const tab = utils.getByText("Tab #1")
    
        expect(utils.getByText("Report Normalization #1")).toBeDefined()
        expect(utils.queryByText("Report Normalization #2")).toBeNull()
        expect(utils.queryByText("Report Normalization #3")).toBeNull()
    })
    
    it("clicked on Tab #2 tab and Report Normalization #2 panel should display", () => {
        const { ...utils } = setup()
    
        const tab = utils.getByText("Tab #2")
        fireEvent.click(tab)
    
        expect(utils.getByText("Report Normalization #2")).toBeDefined()
        expect(utils.queryByText("Report Normalization #1")).toBeNull()
        expect(utils.queryByText("Report Normalization #3")).toBeNull()
    })
    
    it("clicked on Tab #3 tab and Report Normalization #3 panel should display", () => {
        const { ...utils } = setup()
    
        const tab = utils.getByText("Tab #3")
        fireEvent.click(tab)
    
        expect(utils.getByText("Report Normalization #3")).toBeDefined()
        expect(utils.queryByText("Report Normalization #1")).toBeNull()
        expect(utils.queryByText("Report Normalization #2")).toBeNull()
    })
})