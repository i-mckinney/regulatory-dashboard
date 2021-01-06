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
  
    const testTabs = ["Test #1", "Test #2", "Test #3"]
    
    const panelReports = ["Report #1", "Report #2", "Report #3"]
  
    // renderHelixTabs return a list of Helix Tab jsx object
    const renderHelixTabs = () => {
      return testTabs.map((tab, tabIndex) => {
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
    it("be at Test #1 tab and Report #1 panel should display", async () => {
        const { ...utils } = setup()
    
        const tab = utils.getByText("Test #1")
    
        expect(utils.getByText("Report #1")).toBeDefined()
        expect(utils.queryByText("Report #2")).toBeNull()
        expect(utils.queryByText("Report #3")).toBeNull()
    })
    
    it("clicked on Test #2 tab and Report #2 panel should display", () => {
        const { ...utils } = setup()
    
        const tab = utils.getByText("Test #2")
        fireEvent.click(tab)
    
        expect(utils.getByText("Report #2")).toBeDefined()
        expect(utils.queryByText("Report #1")).toBeNull()
        expect(utils.queryByText("Report #3")).toBeNull()
    })
    
    it("clicked on Test #3 tab and Report #3 panel should display", () => {
        const { ...utils } = setup()
    
        const tab = utils.getByText("Test #3")
        fireEvent.click(tab)
    
        expect(utils.getByText("Report #3")).toBeDefined()
        expect(utils.queryByText("Report #1")).toBeNull()
        expect(utils.queryByText("Report #2")).toBeNull()
    })
})