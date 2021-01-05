import React from "react";
import { render } from "@testing-library/react";
import HelixTabPanel from "./index";
import "@testing-library/jest-dom/extend-expect";

function Panel() {
    return (
        <HelixTabPanel key={1} value={1} index={1}>
            <ul>
                <li>{`Tab #1`}</li>
            </ul>
        </HelixTabPanel>
    )
}

const setup = () => {
    const utils = render(<Panel />)
    const panel = utils.getByText("Tab #1")
    return {
        panel,
        ...utils,
    }
}

it("should render Panel component", () => {
    const { panel } = setup()
    expect(panel).toBeDefined()
})