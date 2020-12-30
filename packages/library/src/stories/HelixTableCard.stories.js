import React from "react";
import HelixTableCard from "../components/Table/HelixTableCard/index"
import { withKnobs } from "@storybook/addon-knobs"
import CssBaseline from "@material-ui/core/CssBaseline"
import ThemeSelector from "../themes/ThemeSelector"

export default {
    title:"Helix Components/Helix Table Card",
    decorators: [withKnobs],
    component: HelixTableCard,
}

/**
 * 
 * HelixTableCard.stories.js contains this code. 
 * the index.js file that is in the same folder HelixTableCard is straight from our repo
 * this file is loading that code.
 * @title is the name of the component "Story" folder
 * @component needs to be set to the import component for the cool controls to populate
 * @ThemeSelector is this goofy way I figured out how to change themes on the components 
 * @decorator You have to add the decorator withKnobs for it to work.
 * 
 */

const renderCardContent = () => {
    return (
    <ul>
        <li>{`Name: Robert McGerald`}</li>
        <li>{`Date: 12/02/2021`}</li>
    </ul>
    )
}

/**
 * @param {object} args represents arguments that SampleHelixTableCard needs
 */
export const SampleHelixTableCard = (args) => {
    return (
        <ThemeSelector>
            <CssBaseline />
            <HelixTableCard {...args} />
        </ThemeSelector>
    )
}

/**
 * SampleHelixTableCard.args are arguments will provide to SamplHelixTableCard to work functionality
 */
SampleHelixTableCard.args = {
    recordLabel: "Sample Helix Table Card Inc",
    systemOfRecord: "SampleHexlixCP",
    renderCardContent: renderCardContent
}