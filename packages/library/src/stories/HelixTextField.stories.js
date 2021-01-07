import React, { useState } from "react";
import HelixTextField from "../components/HelixTextField/index"
import { withKnobs } from "@storybook/addon-knobs"
import CssBaseline from "@material-ui/core/CssBaseline"
import ThemeSelector from "../themes/ThemeSelector"

export default {
    title:"Helix Components/Helix Text Field",
    decorators: [withKnobs],
    component: HelixTextField,
}

/**
 * 
 * HelixTextField.stories.js contains this code. 
 * the index.js file that is in the same folder HelixTextField is straight from our repo
 * this file is loading that code.
 * @title is the name of the component "Story" folder
 * @component needs to be set to the import component for the cool controls to populate
 * @ThemeSelector is this goofy way I figured out how to change themes on the components 
 * @decorator You have to add the decorator withKnobs for it to work.
 * 
 */

/**
 * @param {object} args represents arguments that SampleHelixTextField needs
 */
export const SampleHelixTextField = (args) => {
    const [value, setValue] = useState("")

    const handleInput = (event) => {
        setValue(event.target.value)
    }
    
    args.onChange = handleInput
    args.value = value

    if (value[0] === "$") {
        args.error = isNaN(value.slice(1)) ? true : false
    } else {
        args.error = isNaN(value) ? true : false
    }

    return (
        <ThemeSelector>
            <CssBaseline />
            <HelixTextField {...args} />
        </ThemeSelector>
    )
}

/**
 * SampleHelixTextField.args are arguments will provide to SampleHelixTable to work functionality
 */
SampleHelixTextField.args = {
    label: "Cost Input",
    name: "costInput",
    placeholder: "$1.99",
}

SampleHelixTextField.parameters = {
    jest: ["HelixTextField.test.js"],
};