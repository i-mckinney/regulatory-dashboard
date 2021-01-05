import React, { useState } from "react";
import { FormControlLabel } from "@material-ui/core"
import { render, fireEvent } from "@testing-library/react";
import HelixSwitch from "./index";
import "@testing-library/jest-dom/extend-expect";

function Setting() {
    const [state, setState] = useState({
        scheduledNightLight: true,
        mostUsedApp: true,
        recentlyAddedApp: true,
    })
    
      const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    }

    return (
        <div>
            <FormControlLabel
            control={<HelixSwitch
                checked={state.scheduledNightLight}
                onChange={handleChange}
                name="scheduledNightLight"
                inputProps={{ "data-testid": "scheduledNightLight" }}
                />}
            label="Scheduled night light"
            />
            <FormControlLabel
            control={<HelixSwitch
                checked={state.mostUsedApp}
                onChange={handleChange}
                name="mostUsedApp"
                inputProps={{ "data-testid": "mostUsedApp" }}
                />}
            label="Show most used apps"
            />
            <FormControlLabel
            control={<HelixSwitch
                checked={state.recentlyAddedApp}
                onChange={handleChange}
                name="recentlyAddedApp"
                inputProps={{ "data-testid": "recentlyAddedApp" }}
                />}
            label="Show recently added apps"
            />
        </div>
    )
}

const setup = (element = "") => {
    const utils = render(<Setting />)
    const toggle = element ? utils.getByTestId(`${element}`) : null
    return {
        toggle,
        ...utils,
    }
}

it("should return all true due to initial state", () => {
    const { ...utils } = setup()
    expect(utils.getByTestId("scheduledNightLight").checked).toBe(true)
    expect(utils.getByTestId("mostUsedApp").checked).toBe(true)
    expect(utils.getByTestId("recentlyAddedApp").checked).toBe(true)
    
})

describe("Setting should", () => {

    it("return true since scheduled night light is on", () => {
        // Render new instance in every test to prevent leaking state
        const { toggle } = setup("scheduledNightLight")
        expect(toggle.checked).toBe(true)
    });

    it("return true since most used app is on", () => {
        // Render new instance in every test to prevent leaking state
        const { toggle } = setup("mostUsedApp")
        expect(toggle.checked).toBe(true)
    });

    it("return true since recently added App is on", () => {
        // Render new instance in every test to prevent leaking state
        const { toggle } = setup("recentlyAddedApp")
        expect(toggle.checked).toBe(true)
    });

    it("return false since scheduled night light is off (untoggle)", () => {
        // Render new instance in every test to prevent leaking state
        const { toggle } = setup("scheduledNightLight")
        fireEvent.change(toggle, { target: { checked: false }})
        expect(toggle.checked).toBe(false)
    });

    it("return false since scheduled night light is off (untoggle)", () => {
        // Render new instance in every test to prevent leaking state
        const { toggle } = setup("mostUsedApp")
        fireEvent.change(toggle, { target: { checked: false }})
        expect(toggle.checked).toBe(false)
    });

    it("return false since scheduled night light is off (untoggle)", () => {
        // Render new instance in every test to prevent leaking state
        const { toggle } = setup("recentlyAddedApp")
        fireEvent.change(toggle, { target: { checked: false }})
        expect(toggle.checked).toBe(false)
    });
});