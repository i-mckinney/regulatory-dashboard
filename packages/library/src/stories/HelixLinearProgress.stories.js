import React from "react";
import HelixLinearProgress from "../components/HelixLinearProgress/index"
import { withKnobs } from "@storybook/addon-knobs"
import CssBaseline from "@material-ui/core/CssBaseline"
import ThemeSelector from "../themes/ThemeSelector"

export default {
    title:"Helix Components/Helix Linear Progress",
    decorators: [withKnobs],
    component: HelixLinearProgress,
}

/**
 * 
 * HelixLinearProgress.stories.js contains this code. 
 * the index.js file that is in the same folder HelixLinearProgress is straight from our repo
 * this file is loading that code.
 * @title is the name of the component "Story" folder
 * @component needs to be set to the import component for the cool controls to populate
 * @ThemeSelector is this goofy way I figured out how to change themes on the components 
 * @decorator You have to add the decorator withKnobs for it to work.
 * 
 */

/**
 * @param {object} args represents arguments that SampleHelixLinearProgress needs
 */
export const SampleHelixLinearProgress = (args) => {
    return (
        <ThemeSelector>
            <CssBaseline />
            <HelixLinearProgress {...args} />
        </ThemeSelector>
    )
}

/**
 * SampleHelixLinearProgress.args are arguments will provide to SamplHelixLinearProgress to work functionality
 */
SampleHelixLinearProgress.args = {
    value: 100
}