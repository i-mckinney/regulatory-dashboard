import React from "react";
import HelixSwitch from "../components/HelixSwitch/index"
import { withKnobs } from "@storybook/addon-knobs"
import CssBaseline from "@material-ui/core/CssBaseline"
import ThemeSelector from "../themes/ThemeSelector"

export default {
    title:"Helix Components/Helix Switch",
    decorators: [withKnobs],
    component: HelixSwitch,
}

/**
 * 
 * HelixSwitch.stories.js contains this code. 
 * the index.js file that is in the same folder HelixSwitch is straight from our repo
 * this file is loading that code.
 * @title is the name of the component "Story" folder
 * @component needs to be set to the import component for the cool controls to populate
 * @ThemeSelector is this goofy way I figured out how to change themes on the components 
 * @decorator You have to add the decorator withKnobs for it to work.
 * 
 */

/**
 * @param {object} args represents arguments that SampleHelixSwitch needs
 */
export const SampleHelixSwitch = (args) => {
    return (
        <ThemeSelector>
            <CssBaseline />
            <HelixSwitch {...args} />
        </ThemeSelector>
    )
}

/**
 * SampleHelixSwitch.args are arguments will provide to SamplHelixSwitch to work functionality
 */
SampleHelixSwitch.args = {}